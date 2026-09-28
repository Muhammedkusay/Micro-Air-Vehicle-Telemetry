import asyncio
import json
from websockets.asyncio.server import serve
from websockets.exceptions import ConnectionClosed
from .telemetry import telemetry

clients = set()

async def handler(websocket):
    clients.add(websocket)

    print("Client connected")

    try:
        await websocket.wait_closed()
    except ConnectionClosed:
        pass
    finally:
        clients.remove(websocket)
        print("Client Disconnected")

async def broadcast():
    if not clients:
        return

    message = json.dumps(telemetry)

    await asyncio.gather(
        *(client.send(message) for client in clients),
        return_exceptions=True
    )

async def start_server():
    async with serve(handler, "localhost", 8765):
        print("WebSocket server running on ws://localhost:8765")

        while True:
            await broadcast()
            await asyncio.sleep(0.05) #20
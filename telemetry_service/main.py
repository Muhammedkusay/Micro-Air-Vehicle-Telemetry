import asyncio
import time
import threading

from app.mavlink import connect, receive
from app.telemetry import update_telemetry, telemetry
from app.api import create_flight, send_telemetry
from app.websocket import start_server

def run_websocket():
    asyncio.run(start_server())

# Start websocket server
websocket_thread = threading.Thread(
    target=run_websocket,
    daemon=True # thread automatically stops when main python program stops
)

websocket_thread.start()

# Connect to mavlink
master = connect()

telemetry["system_id"] = master.target_system
telemetry["connection"] = True
print(telemetry["system_id"])

flight_id = create_flight(telemetry["system_id"])

print(f"Flight started {flight_id}")

last_api = 0

while True:
    msg = receive(master)

    if msg:
        update_telemetry(msg)
        telemetry["connection"] = True
    else:
        telemetry["connection"] = False

    now = time.time()

    if telemetry["connection"] and now - last_api >= 1.0:
        send_telemetry(telemetry["system_id"], flight_id, telemetry)
        print("Telemetry sent")
        last_api = now
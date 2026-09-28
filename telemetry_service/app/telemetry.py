import math
from .mavlink import connect
from pymavlink import mavutil
from time import time

telemetry = {
    "connection": False,
    "system_id": None,
    
    "mode": None,
    "armed": None,

    "latitude": None,
    "longitude": None,
    "altitude": None,

    "roll": None,
    "pitch": None,
    "yaw": None,

    "ground_speed": None,
    "heading": None,
    "climb": None,

    "battery_voltage": None,
    "battery_current": None,
    "battery_remaining": None,

    "gps_fix": None,
    "satellites": None,
}

def update_telemetry(msg):
    msg_type = msg.get_type()

    if msg_type == "HEARTBEAT":
        telemetry["mode"] = mavutil.mode_string_v10(msg)

        telemetry["armed"] = bool(
            msg.base_mode
            & mavutil.mavlink.MAV_MODE_FLAG_SAFETY_ARMED
        )

    elif msg_type == "GLOBAL_POSITION_INT":
        telemetry["latitude"] = msg.lat / 1e7 # 361.23
        telemetry["longitude"] = msg.lon / 1e7
        telemetry["altitude"] = msg.relative_alt / 1000.0

    elif msg_type == "ATTITUDE":
        telemetry["roll"] = msg.roll * 57.2958 #3.14 
        telemetry["pitch"] = msg.pitch * 57.2958
        telemetry["yaw"] = msg.yaw * 57.2958

    elif msg_type == "VFR_HUD":
        telemetry["ground_speed"] = msg.groundspeed
        telemetry["heading"] = msg.heading
        telemetry["climb"] = msg.climb

    elif msg_type == "SYS_STATUS":
        telemetry["battery_voltage"] = msg.voltage_battery / 1000.0
        telemetry["battery_current"] = msg.current_battery / 100.0
        telemetry["battery_remaining"] = msg.battery_remaining

    elif msg_type == "GPS_RAW_INT":
        telemetry["gps_fix"] = msg.fix_type
        telemetry["satellites"] = msg.satellites_visible
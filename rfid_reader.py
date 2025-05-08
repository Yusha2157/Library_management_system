import serial
import requests
import time
import json
import serial.tools.list_ports

def find_arduino_port():
    """Find the Arduino port automatically"""
    ports = list(serial.tools.list_ports.comports())
    for port in ports:
        if 'Arduino' in port.description or 'USB Serial Device' in port.description:
            return port.device
    return None

# Configure serial port
SERIAL_PORT = find_arduino_port() or 'COM3'  # Try to find Arduino port automatically
BAUD_RATE = 9600

# Backend API endpoint
API_URL = 'http://localhost:5000/api/rfid/scan'

# Authentication token
AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFhMGM4YzEzNWYxZjBjMDFhNDhmNzkiLCJpYXQiOjE3NDY2MzcwMzMsImV4cCI6MTc0OTIyOTAzM30.yXwKwZckiyKqLae6Wjb_YexVI-a9DsxUPoiGRukRuvk'

# Debounce settings
DEBOUNCE_TIME = 2  # seconds
last_scan_time = 0
last_scan_tag = None

def clean_rfid_tag(tag):
    """Clean the RFID tag by removing spaces and converting to uppercase"""
    return tag.replace('UID tag :', '').replace(' ', '').strip().upper()

def read_rfid():
    global last_scan_time, last_scan_tag
    
    try:
        print(f"Attempting to connect to {SERIAL_PORT}...")
        
        # Try to open the port with a timeout
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        print(f"Successfully connected to {SERIAL_PORT}")
        print("Waiting for RFID tags...")
        print("Scan a book's RFID tag to check its status")
        print("If the book is not found, use the Add Book form to register it")
        
        while True:
            if ser.in_waiting:
                # Read the RFID tag
                rfid_tag = ser.readline().decode('utf-8').strip()
                if rfid_tag:  # Only process non-empty tags
                    # Clean the RFID tag
                    clean_tag = clean_rfid_tag(rfid_tag)
                    
                    # Check if this is a duplicate scan
                    current_time = time.time()
                    if (clean_tag == last_scan_tag and 
                        current_time - last_scan_time < DEBOUNCE_TIME):
                        print("Skipping duplicate scan...")
                        continue
                    
                    # Update last scan info
                    last_scan_time = current_time
                    last_scan_tag = clean_tag
                    
                    print(f"\nScanned RFID tag: {clean_tag}")
                    
                    # Send to backend
                    try:
                        response = requests.post(
                            API_URL,
                            json={'rfid_tag': clean_tag},
                            headers={
                                'Content-Type': 'application/json',
                                'Authorization': f'Bearer {AUTH_TOKEN}'
                            }
                        )
                        
                        if response.status_code == 200:
                            data = response.json()
                            print(f"\nSuccess: {data['message']}")
                            print(f"Book: {data['book']['name']}")
                            print(f"Author: {data['book']['author']}")
                            print(f"Status: {data['book']['status']}")
                            print(f"Action: {data['action']}")
                        else:
                            error_data = response.json()
                            print(f"\nError: {error_data.get('message', 'Unknown error')}")
                            if error_data.get('instructions'):
                                print(f"Instructions: {error_data['instructions']}")
                                print(f"Use this RFID tag when adding the book: {error_data['rfid_tag']}")
                    
                    except requests.exceptions.RequestException as e:
                        print(f"Error sending to backend: {e}")
                    
                    # Wait a bit before next scan
                    time.sleep(1)
    
    except serial.SerialException as e:
        print(f"Error opening serial port: {e}")
        print("\nTroubleshooting steps:")
        print("1. Make sure Arduino is connected")
        print("2. Check if the correct COM port is selected")
        print("3. Close any other programs that might be using the port")
        print("4. Try unplugging and replugging the Arduino")
        print("5. Run this script with administrator privileges")
    except KeyboardInterrupt:
        print("\nExiting...")
    finally:
        if 'ser' in locals():
            ser.close()
            print("Serial port closed")

if __name__ == "__main__":
    print("Starting RFID reader...")
    print("Press Ctrl+C to exit")
    read_rfid() 
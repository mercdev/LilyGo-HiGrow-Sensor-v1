# LilyGo HiGrow ESP32 Plant Monitoring Sensor Firmware (Hardware v1)

<p align="center">
  <img src="LilyGO_HiGrow_Rev1_PhotoFrontHiGrow.jpg" width="60%">
</p>

## Differences
- This codebase focuses on the v1 hardware, which does not have a light sensor.
- RPC support included
- Device id's are not tracked and sent to HiGrow's cloud at https://api.higrow.tech/api/records

## Overview
- Use this code with [MongooseOS](https://mongoose-os.com/) and the LilyGo HiGrow ESP32 Plant Monitoring Sensor v1.0 board to obtain sensor readings and control LED's
- Boards can be purchased directly from LilyGo on [AliExpress](https://www.aliexpress.com/item/ESP32-WIFI-Bluetooth-battery-soil-Moisture-Senson-DHT/32815782900.html)

## HiGrow's Officially Supported Repo
- Luca's officially supported repo is located at https://github.com/mongoose-os-apps/lilygo-higrow-soil-temp-humi-sensor, please considering supporting his work over there.
- Set your device `bt_devname` in the **mos.yml** file. In order for it to work with the HiGrow app, each name should start with "Higrow". According to HiGrow, this will be fixed in a future release.
- Visit http://www.higrow.tech/en/ more info on the HiGrow project.

## How to install this app using MongooseOS

- Install and start [mos tool](https://mongoose-os.com/software.html)
- Switch to the Project page, find and import this app, build and flash it:

<p align="center">
  <img src="https://mongoose-os.com/images/app1.gif" width="75%">
</p>

load('api_config.js');
load('api_events.js');
load('api_gpio.js');
load('api_http.js');
load('api_net.js');
load('api_sys.js');
load('api_timer.js');
load('api_esp32.js');
load('api_dht.js');
load('api_adc.js');
load('api_rpc.js');

//Pins
let ResetPin = 0;
let LedPin = 16;
let DHTpin = 22;
let SOILpin = 32;
let LIGHTpin = 34;

// Turn on status led
GPIO.set_mode(LedPin, GPIO.MODE_OUTPUT);
GPIO.write(LedPin, 0);

//Reset Handler
GPIO.set_mode(ResetPin, GPIO.MODE_INPUT);
GPIO.set_int_handler(ResetPin, GPIO.INT_EDGE_NEG, function(ResetPin) {
  print('Pin', ResetPin, 'got interrupt');
  GPIO.toggle(LedPin);
  Sys.usleep(200000);
  GPIO.toggle(LedPin);
  Sys.usleep(200000);
  GPIO.toggle(LedPin);
  Sys.usleep(200000);
  GPIO.toggle(LedPin);
  Sys.usleep(200000);
  GPIO.toggle(LedPin);
  Sys.usleep(200000);
  GPIO.write(LedPin, 0);

  Cfg.set({bt:{enable:true}});
  Cfg.set({wifi:{sta:{enable:false}}});
  Cfg.set({wifi:{ap:{enable:false}}});
  Cfg.set({wifi:{sta:{ssid:'',pass:''}}});

  Sys.reboot(1000);
}, null);
GPIO.enable_int(ResetPin);

ADC.enable(SOILpin);
let dht = DHT.create(DHTpin, DHT.DHT11);
let deviceId = Cfg.get("higrow.deviceId");
if (deviceId === "")
{
  deviceId = Cfg.get("device.id");
  Cfg.set("higrow.devideId", deviceId);
}

let connected = false;
let readSensors = Timer.set(15000, Timer.REPEAT, function() {
  let t = dht.getTemp();
  let h = dht.getHumidity();
  let m = ADC.read(SOILpin);
  let l = ADC.read(LIGHTpin); 

  print("DeviceId:", deviceId,"Temperature:",t,"Humidity:",h,"Moisture:",m,"Light:",l);

  //Timer.del(readSensors);

  //ESP32.deepSleep(3600000000); //3600 seconds / 60 minutes
  /*
  Cfg.set({higrow:{temperature:jsonData.Temperature}});
  Cfg.set({higrow:{moisture:jsonData.Water}});
  Cfg.set({higrow:{humidity:jsonData.Humidity}});
  Cfg.set({higrow:{light:jsonData.Light}});
  */
}, null);

// Monitor network connectivity.
Event.addGroupHandler(Net.EVENT_GRP, function(ev, evdata, arg) {
  let status = true && connected;
  let evs = '???';
  if (ev === Net.STATUS_DISCONNECTED) {
    evs = 'DISCONNECTED';
    connected = false;
  } else if (ev === Net.STATUS_CONNECTING) {
    evs = 'CONNECTING';
    connected = false;
  } else if (ev === Net.STATUS_CONNECTED) {
    evs = 'CONNECTED';
    connected = false;
  } else if (ev === Net.STATUS_GOT_IP) {
    evs = 'GOT_IP';
    connected = true;
  }
}, null);

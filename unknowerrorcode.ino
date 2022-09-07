
#include <Arduino.h>
#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif
#include <Firebase_ESP_Client.h>

// Provide the token generation process info.garamond
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "ECALEVENT"
#define WIFI_PASSWORD "garamond"
/* 2. Define the API Key */
#define API_KEY "AIzaSyAzg02dlE_kUnUay4ehOYZal_4CZ2umuVs"
/* 3. Define the RTDB URL */
#define DATABASE_URL "https://wemosmaquette-default-rtdb.europe-west1.firebasedatabase.app"
// Define Firebase Data object
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

#include <Adafruit_NeoPixel.h>
#define PIN D4    // D2 for Wemos Mini Ws2812B 1 LED / D4 for 7 LED shield
#define LED_NUM 7 // 1 for Wemos Mini Ws2812B 1 LED / 7 for 7 LED shield
uint8 ledR;
uint8 ledG;
uint8 ledB;
int led_intensity = 1;
Adafruit_NeoPixel leds = Adafruit_NeoPixel(LED_NUM, PIN, NEO_GRB + NEO_KHZ800);

unsigned long sendDataPrevMillis = 0;
bool signupOK = false;
String color;
int power = 0;
int intensity = 10;

void setup()
{
    Serial.begin(115200);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    /* Assign the api key (required) */
    config.api_key = API_KEY;

    /* Assign the RTDB URL (required) */
    config.database_url = DATABASE_URL;

    /* Sign up */
    if (Firebase.signUp(&config, &auth, "", ""))
    {
        Serial.println("ok");
        signupOK = true;
    }
    else
    {
        Serial.printf("%s\n", config.signer.signupError.message.c_str());
    }

    /* Assign the callback function for the long running token generation task */
    config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h

    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    /*LEDS CONFIGURE*/
    leds.begin(); // This initializes the NeoPixel library.
}

void intensity_set(int I)
{

    uint8 R = ledR * I;
    uint8 G = ledG * I;
    uint8 B = ledB * I;
    for (int i = 0; i < LED_NUM; i++)
    {
        leds.setPixelColor(i, leds.Color(R, G, B));
        // leds.setPixelColor(i, leds.Color(G, R, B));
        leds.show();
    }
}

void led_set_power(int I)
{
    intensity_set(I);
    leds.setPixelColor(0, leds.Color(255, 255, 255));
    leds.show();
}

void led_set_color(uint8 R, uint8 G, uint8 B)
{
    for (int i = 0; i < LED_NUM; i++)
    {
        leds.setPixelColor(i, leds.Color(R, G, B));
        leds.show();
        delay(50);
    }
}

void loop()
{
    if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 500 || sendDataPrevMillis == 0))
    {
        sendDataPrevMillis = millis();

        if (Firebase.RTDB.getString(&fbdo, "/wemos1/color"))
        {
            if (fbdo.dataType() == "string")
            {
                color = fbdo.stringData();
                Serial.println(color);
            }
        }
        else
        {
            Serial.println(fbdo.errorReason());
        }

        if (Firebase.RTDB.getInt(&fbdo, "/wemos1/power"))
        {
            if (fbdo.dataType() == "int")
            {
                if (power != fbdo.intData())
                {
                    if (fbdo.intData() == 0)
                    {
                        // led_set_power(0);
                    }
                    else
                    {
                        // led_set_power(1);
                    }
                }
                power = fbdo.intData();
            }
            Serial.println(power);
        }
    }
    else
    {
        Serial.println(fbdo.errorReason());
    }
}
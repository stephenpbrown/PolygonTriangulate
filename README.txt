Author: Steve Brown
Email: Stephen.P.Brown@wsu.edu
Version 1.0 (9/7/16)

Description:
This program is used for triangulating simple polygons (without bow-ties or holes).
This is done by finding "ears" of the polygon and clipping them off until only one triangle 
is left. The program takes input through stdin in JSON format and returns it in JSON format.

How to run program:
The JavaScript program runs using the nodejs engine. Follow is an example of how to run the program:
node PolyTriangulate.js < test.json > test-result.json

This will run the file PolyTriangulate.js, input the test.json file through stdin, and
output the result through stdout channeled into test-result.json.

test.json:
[
{"x" : 360.0, "y" : 333.0},
{"x" : 216.0, "y" : 216.0},
{"x" : 216.0, "y" : 288.0},
{"x" : 144.0, "y" : 144.0},
{"x" : 288.0, "y" : 216.0},
{"x" : 288.0, "y" : 144.0},
{"x" : 216.0, "y" : 108.0},
{"x" : 369.0, "y" : 90.0},
{"x" : 432.0, "y" : 243.0},
{"x" : 333.0, "y" : 144.0}
]

test-result.json:
{
    "verts": [
        {
            "x": 360,
            "y": 333
        },
        {
            "x": 216,
            "y": 216
        },
        {
            "x": 216,
            "y": 288
        },
        {
            "x": 144,
            "y": 144
        },
        {
            "x": 288,
            "y": 216
        },
        {
            "x": 288,
            "y": 144
        },
        {
            "x": 216,
            "y": 108
        },
        {
            "x": 369,
            "y": 90
        },
        {
            "x": 432,
            "y": 243
        },
        {
            "x": 333,
            "y": 144
        }
    ],
    "triangles": [
        7,
        8,
        9,
        6,
        7,
        9,
        1,
        2,
        3,
        1,
        3,
        4,
        0,
        1,
        4,
        9,
        0,
        4,
        9,
        4,
        5,
        5,
        6,
        9
    ]
}

Files included:
PolyTriangulate.js
README
test
test-result.json
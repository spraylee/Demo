/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'logo',
                            type: 'image',
                            tag: 'img',
                            rect: ['25.8%', '22.7%', '48%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"logo.png",'50%','49.95%','332px','334px', 'no-repeat'],
                            transform: [[],[],[],['0.73','0.73']]
                        },
                        {
                            id: 'word',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.6%', '55.7%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"word.png",'0px','0px']
                        },
                        {
                            id: 'line',
                            display: 'block',
                            type: 'image',
                            tag: 'img',
                            rect: ['15%', '56.9%', '70%', 'auto', 'auto', 'auto'],
                            clip: 'rect(0px 291px 19px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"line.png",'0px','0px']
                        },
                        {
                            id: 'moveHand',
                            type: 'image',
                            tag: 'img',
                            rect: ['100%', '51.3%', '16.2%', 'auto', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"moveHand.png",'0px','0px']
                        },
                        {
                            id: 'Ellipse',
                            type: 'ellipse',
                            rect: ['39.7%', '22%', '20%', '20%', 'auto', 'auto'],
                            borderRadius: ["50%", "50%", "50%", "50%"],
                            opacity: '1',
                            fill: ["rgba(0,89,188,1)"],
                            stroke: [0,"rgba(0,0,0,1)","none"],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'Group',
                            type: 'group',
                            rect: ['33.6%', '113.3%', '30%', '12%', 'auto', 'auto'],
                            c: [
                            {
                                id: 'credentials_06',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.3%', '-802.1%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px']
                            },
                            {
                                id: 'credentials_05',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.3%', '11.1%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_05.png",'0px','0px']
                            },
                            {
                                id: 'credentials_04',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.3%', '-687.2%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_04.png",'0px','0px']
                            },
                            {
                                id: 'credentials_03',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.3%', '-576.8%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_03.png",'0px','0px']
                            },
                            {
                                id: 'credentials_02',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.3%', '-456%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_02.png",'0px','0px']
                            },
                            {
                                id: 'credentials_01',
                                type: 'image',
                                tag: 'img',
                                rect: ['0.3%', '-339.7%', '99.4%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_01.png",'0px','0px']
                            },
                            {
                                id: 'Text',
                                type: 'text',
                                rect: ['-29.6%', '-227.6%', 'auto', 'auto', 'auto', 'auto'],
                                opacity: '0',
                                text: "<p style=\"margin: 0px;\">​快照种类多</p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", "nowrap"],
                                textStyle: ["", "", "", "", "none"]
                            }]
                        },
                        {
                            id: 'Group2',
                            type: 'group',
                            rect: ['-21.6%', '80.3%', '129.3%', '8%', 'auto', 'auto'],
                            c: [
                            {
                                id: 'credentials_062',
                                type: 'image',
                                tag: 'img',
                                rect: ['84.5%', '-0.5%', '15.5%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px']
                            },
                            {
                                id: 'credentials_052',
                                type: 'image',
                                tag: 'img',
                                rect: ['67.8%', '-0.5%', '15.3%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_05.png",'0px','0px']
                            },
                            {
                                id: 'credentials_042',
                                type: 'image',
                                tag: 'img',
                                rect: ['50.8%', '-0.5%', '15.5%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_04.png",'0px','0px']
                            },
                            {
                                id: 'credentials_032',
                                type: 'image',
                                tag: 'img',
                                rect: ['34.1%', '-0.5%', '15.5%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_03.png",'0px','0px']
                            },
                            {
                                id: 'credentials_022',
                                type: 'image',
                                tag: 'img',
                                rect: ['17.1%', '-0.5%', '15.5%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_02.png",'0px','0px']
                            },
                            {
                                id: 'credentials_012',
                                type: 'image',
                                tag: 'img',
                                rect: ['-0.1%', '-0.5%', '15.5%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_01.png",'0px','0px']
                            }]
                        },
                        {
                            id: 'cut_01',
                            type: 'image',
                            tag: 'img',
                            rect: ['4.2%', '9%', '88.7%', 'auto', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"cut_01.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '100%', '100%', 'auto', 'auto'],
                            sizeRange: ['0%','','',''],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 11750,
                    autoPlay: true,
                    labels: {
                        "标签 1": 2000
                    },
                    data: [
                        [
                            "eid10842",
                            "top",
                            4000,
                            1834,
                            "easeOutSine",
                            "${credentials_03}",
                            '-576.84%',
                            '233.93%'
                        ],
                        [
                            "eid10799",
                            "display",
                            0,
                            0,
                            "easeOutQuad",
                            "${line}",
                            'block',
                            'none'
                        ],
                        [
                            "eid10798",
                            "display",
                            855,
                            0,
                            "easeOutQuad",
                            "${line}",
                            'none',
                            'block'
                        ],
                        [
                            "eid10813",
                            "top",
                            1500,
                            1132,
                            "easeOutCubic",
                            "${moveHand}",
                            '51.32%',
                            '31.92%'
                        ],
                        [
                            "eid10797",
                            "clip",
                            855,
                            645,
                            "easeOutQuad",
                            "${line}",
                            [0,-11,19,0],
                            [0,291,19,0],
                            {valueTemplate: 'rect(@@0@@px @@1@@px @@2@@px @@3@@px)'}
                        ],
                        [
                            "eid10840",
                            "top",
                            3500,
                            1834,
                            "easeOutSine",
                            "${credentials_01}",
                            '-339.67%',
                            '460.56%'
                        ],
                        [
                            "eid10841",
                            "top",
                            4291,
                            1834,
                            "easeOutSine",
                            "${credentials_04}",
                            '-687.24%',
                            '121.62%'
                        ],
                        [
                            "eid10867",
                            "scaleX",
                            9250,
                            2500,
                            "easeOutBounce",
                            "${cut_01}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10791",
                            "opacity",
                            457,
                            730,
                            "easeOutQuad",
                            "${word}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10852",
                            "top",
                            770,
                            0,
                            "easeOutQuad",
                            "${logo}",
                            '22.68%',
                            '22.68%'
                        ],
                        [
                            "eid10856",
                            "opacity",
                            6225,
                            875,
                            "easeInOutQuad",
                            "${Text}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10862",
                            "opacity",
                            7500,
                            500,
                            "easeInOutQuad",
                            "${Text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10868",
                            "scaleY",
                            9250,
                            2500,
                            "easeOutBounce",
                            "${cut_01}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10864",
                            "left",
                            9000,
                            2750,
                            "easeOutCubic",
                            "${Group2}",
                            '101.42%',
                            '-21.58%'
                        ],
                        [
                            "eid10851",
                            "left",
                            770,
                            0,
                            "easeOutQuad",
                            "${logo}",
                            '25.83%',
                            '25.83%'
                        ],
                        [
                            "eid10854",
                            "top",
                            6225,
                            875,
                            "easeInOutQuad",
                            "${Text}",
                            '-227.63%',
                            '-184.59%'
                        ],
                        [
                            "eid10850",
                            "width",
                            770,
                            0,
                            "easeOutQuad",
                            "${logo}",
                            '47.95%',
                            '47.95%'
                        ],
                        [
                            "eid10833",
                            "background-color",
                            3324,
                            426,
                            "easeInQuad",
                            "${Ellipse}",
                            'rgba(0,89,188,1)',
                            'rgba(0,188,164,1.00)'
                        ],
                        [
                            "eid10844",
                            "top",
                            4916,
                            1834,
                            "easeOutSine",
                            "${credentials_06}",
                            '-802.06%',
                            '-99.71%'
                        ],
                        [
                            "eid10857",
                            "top",
                            4604,
                            1817,
                            "easeOutSine",
                            "${credentials_05}",
                            '-808.59%',
                            '11.07%'
                        ],
                        [
                            "eid10847",
                            "top",
                            3500,
                            4250,
                            "easeOutQuad",
                            "${Group}",
                            '14.95%',
                            '32.08%'
                        ],
                        [
                            "eid10859",
                            "top",
                            7750,
                            1000,
                            "easeInQuart",
                            "${Group}",
                            '32.08%',
                            '113.25%'
                        ],
                        [
                            "eid10812",
                            "left",
                            1500,
                            1132,
                            "easeOutCubic",
                            "${moveHand}",
                            '99.99%',
                            '49.74%'
                        ],
                        [
                            "eid10820",
                            "scaleX",
                            2632,
                            918,
                            "easeInOutQuad",
                            "${Ellipse}",
                            '0',
                            '9.56'
                        ],
                        [
                            "eid10821",
                            "scaleY",
                            2632,
                            918,
                            "easeInOutQuad",
                            "${Ellipse}",
                            '0',
                            '9.56'
                        ],
                        [
                            "eid7",
                            "opacity",
                            0,
                            770,
                            "easeOutQuad",
                            "${logo}",
                            '0.000000',
                            '1'
                        ],
                        [
                            "eid10794",
                            "top",
                            457,
                            730,
                            "easeOutQuad",
                            "${word}",
                            '55.67%',
                            '53.02%'
                        ],
                        [
                            "eid10845",
                            "top",
                            3750,
                            1834,
                            "easeOutSine",
                            "${credentials_02}",
                            '-456.05%',
                            '348.03%'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("demo_edgeActions.js");
})("EDGE-455333329");

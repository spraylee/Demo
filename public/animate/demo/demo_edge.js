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
                            rect: ['25.8%', '14.4%', '48%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"logo.png",'50%','49.95%','332px','334px', 'no-repeat'],
                            transform: [[],[],[],['0.73','0.73']]
                        },
                        {
                            id: 'word',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.7%', '51.4%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"word.png",'0px','0px']
                        },
                        {
                            id: 'line',
                            display: 'block',
                            type: 'image',
                            tag: 'img',
                            rect: ['15%', '48.7%', '70%', 'auto', 'auto', 'auto'],
                            clip: 'rect(0px 291px 19px 0px)',
                            fill: ["rgba(0,0,0,0)",im+"line.png",'0px','0px']
                        },
                        {
                            id: 'moveHand',
                            type: 'image',
                            tag: 'img',
                            rect: ['49.7%', '25.7%', '16.2%', 'auto', 'auto', 'auto'],
                            opacity: '1',
                            fill: ["rgba(0,0,0,0)",im+"moveHand.png",'0px','0px']
                        },
                        {
                            id: 'Ellipse',
                            type: 'ellipse',
                            rect: ['39.8%', '15.6%', '20%', '20%', 'auto', 'auto'],
                            borderRadius: ["50%", "50%", "50%", "50%"],
                            opacity: '1',
                            fill: ["rgba(0,89,188,1)"],
                            stroke: [0,"rgba(0,0,0,1)","none"],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'Group',
                            type: 'group',
                            rect: ['0%', '113.3%', '100%', '12%', 'auto', 'auto'],
                            c: [
                            {
                                id: 'credentials_06',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '-802.1%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px']
                            },
                            {
                                id: 'credentials_05',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '11.1%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_05.png",'0px','0px']
                            },
                            {
                                id: 'credentials_04',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '-687.2%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_04.png",'0px','0px']
                            },
                            {
                                id: 'credentials_03',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '-576.8%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_03.png",'0px','0px']
                            },
                            {
                                id: 'credentials_02',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '-456%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_02.png",'0px','0px']
                            },
                            {
                                id: 'credentials_01',
                                type: 'image',
                                tag: 'img',
                                rect: ['35.9%', '-339.7%', '28%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"credentials_01.png",'0px','0px']
                            },
                            {
                                id: 'Text',
                                type: 'text',
                                rect: ['0.1%', '-227.6%', '100%', 'auto', 'auto', 'auto'],
                                opacity: '0',
                                text: "<p style=\"margin: 0px;\">​快照种类多</p>",
                                align: "center",
                                font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", ""],
                                textStyle: ["", "", "", "", "none"]
                            }]
                        },
                        {
                            id: 'Group2',
                            type: 'group',
                            rect: ['-21.6%', '80.3%', '129.3%', '8%', 'auto', 'auto'],
                            opacity: '1',
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
                            rect: ['5.3%', '11.7%', '88.9%', 'auto', 'auto', 'auto'],
                            opacity: '1',
                            fill: ["rgba(0,0,0,0)",im+"cut_01.png",'0px','0px'],
                            transform: [[],[],[],['0','1.09']]
                        },
                        {
                            id: 'cut_02',
                            type: 'image',
                            tag: 'img',
                            rect: ['4.2%', '11.8%', '88.9%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"cut_02.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'TextCopy',
                            type: 'text',
                            rect: ['0%', '7%', '100%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​效果即时看</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", ""],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'credentials_063',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.6%', '31.8%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],[],[],['2.7','2.7']]
                        },
                        {
                            id: 'photo_03',
                            type: 'image',
                            tag: 'img',
                            rect: ['26.4%', '24.3%', '44%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"photo_03.png",'0px','0px']
                        },
                        {
                            id: 'photo_01',
                            type: 'image',
                            tag: 'img',
                            rect: ['26.4%', '24.3%', '44%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"photo_01.png",'0px','0px']
                        },
                        {
                            id: 'TextCopy2',
                            type: 'text',
                            rect: ['0%', '6.9%', '100%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​背景任意换</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", ""],
                            textStyle: ["", "", "", "", "none"],
                            transform: [[],[],[],['0']]
                        },
                        {
                            id: 'photo_02',
                            type: 'image',
                            tag: 'img',
                            rect: ['26.4%', '24.3%', '44%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'Group3',
                            type: 'group',
                            rect: ['-20.6%', '21.2%', '132.7%', '50%', 'auto', 'auto'],
                            opacity: '0',
                            transform: [[],[],[],['0.37','0.37']],
                            c: [
                            {
                                id: 'photo_02Copy2',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.4%', '-2.8%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy3',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.6%', '-2.8%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy4',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.4%', '-2.8%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy5',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.4%', '-2.6%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy6',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.6%', '-2.6%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy7',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.4%', '-2.6%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            },
                            {
                                id: 'photo_02Copy8',
                                type: 'image',
                                tag: 'img',
                                rect: ['40.4%', '-2.6%', '33.1%', 'auto', 'auto', 'auto'],
                                fill: ["rgba(0,0,0,0)",im+"photo_02.png",'0px','0px'],
                                transform: [[],[],[],['0.62','0.62']]
                            }]
                        },
                        {
                            id: 'TextCopy3',
                            type: 'text',
                            rect: ['0.1%', '6.9%', '100%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​下单超方便</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", ""],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'moveHand2',
                            type: 'image',
                            tag: 'img',
                            rect: ['51.7%', '45.9%', '16%', 'auto', 'auto', 'auto'],
                            opacity: '1',
                            fill: ["rgba(0,0,0,0)",im+"moveHand.png",'0px','0px']
                        },
                        {
                            id: 'order-btn',
                            type: 'image',
                            tag: 'img',
                            rect: ['29.7%', '76.6%', '40%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"order-btn.png",'0px','0px'],
                            filter: [0, 0, 1, 1, 0, 0, 0, 0, "rgba(0,0,0,0)", 0, 0, 0],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'Rectangle',
                            type: 'rect',
                            rect: ['100%', '0%', '100%', '100%', 'auto', 'auto'],
                            opacity: '1',
                            fill: ["rgba(148,217,32,1.00)"],
                            stroke: [0,"rgba(0,0,0,1)","none"]
                        },
                        {
                            id: 'moveHand2Copy',
                            type: 'image',
                            tag: 'img',
                            rect: ['85%', '104.4%', '16%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"moveHand.png",'0px','0px']
                        },
                        {
                            id: 'credentials_063Copy5',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.6%', '31.8%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'credentials_063Copy4',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.6%', '31.8%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'credentials_063Copy',
                            type: 'image',
                            tag: 'img',
                            rect: ['19.6%', '31.8%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'credentials_064',
                            type: 'image',
                            tag: 'img',
                            rect: ['37%', '32.7%', '36.6%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],['29']]
                        },
                        {
                            id: 'credentials_064Copy',
                            type: 'image',
                            tag: 'img',
                            rect: ['34.2%', '34.6%', '36.6%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],['27']]
                        },
                        {
                            id: 'credentials_064Copy2',
                            type: 'image',
                            tag: 'img',
                            rect: ['34.2%', '44.3%', '36.6%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"credentials_06.png",'0px','0px'],
                            transform: [[],['16']]
                        },
                        {
                            id: 'hand',
                            type: 'image',
                            tag: 'img',
                            rect: ['101.2%', '62.7%', '38.1%', 'auto', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"hand.png",'0px','0px']
                        },
                        {
                            id: 'ems',
                            type: 'image',
                            tag: 'img',
                            rect: ['26.9%', '43.4%', '50.1%', 'auto', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"ems.png",'0px','0px'],
                            transform: [[],[],[],['0','0']]
                        },
                        {
                            id: 'TextCopy4',
                            type: 'text',
                            rect: ['0.1%', '6.9%', '100%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            text: "<p style=\"margin: 0px;\">​快递送到手</p>",
                            align: "center",
                            font: ['Arial, Helvetica, sans-serif', [220, "%"], "rgba(255,255,255,1.00)", "900", "none", "", "break-word", ""],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'guide',
                            display: 'none',
                            type: 'image',
                            tag: 'img',
                            rect: ['20%', '70.1%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"guide.png",'0px','0px']
                        },
                        {
                            id: 'download2',
                            display: 'none',
                            type: 'image',
                            tag: 'img',
                            rect: ['20%', '79.3%', '60%', 'auto', 'auto', 'auto'],
                            opacity: '0',
                            fill: ["rgba(0,0,0,0)",im+"download.png",'0px','0px']
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
                    duration: 26500,
                    autoPlay: true,
                    labels: {
                        "标签 1": 2000
                    },
                    data: [
                        [
                            "eid11138",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy3}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11325",
                            "scaleY",
                            21000,
                            500,
                            "easeInBack",
                            "${order-btn}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11201",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy8}",
                            '-2.64%',
                            '-15.76%'
                        ],
                        [
                            "eid11316",
                            "top",
                            19855,
                            1145,
                            "easeInBack",
                            "${credentials_063Copy5}",
                            '31.8%',
                            '66.86%'
                        ],
                        [
                            "eid10935",
                            "scaleY",
                            15250,
                            812,
                            "easeOutBack",
                            "${cut_02}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11313",
                            "opacity",
                            19108,
                            497,
                            "easeInOutQuad",
                            "${credentials_063Copy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11233",
                            "opacity",
                            18250,
                            500,
                            "easeInOutQuad",
                            "${order-btn}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11462",
                            "width",
                            26500,
                            0,
                            "easeOutBack",
                            "${TextCopy2}",
                            '100%',
                            '100%'
                        ],
                        [
                            "eid11222",
                            "scaleX",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${credentials_063}",
                            '2.7',
                            '1'
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
                            "eid10845",
                            "top",
                            3750,
                            1834,
                            "easeOutSine",
                            "${credentials_02}",
                            '-456.05%',
                            '348.03%'
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
                            "eid11365",
                            "top",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy}",
                            '44.25%',
                            '34.63%'
                        ],
                        [
                            "eid11410",
                            "top",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064Copy}",
                            '34.63%',
                            '34.47%'
                        ],
                        [
                            "eid10813",
                            "top",
                            1500,
                            1132,
                            "easeOutCubic",
                            "${moveHand}",
                            '51.32%',
                            '25.68%'
                        ],
                        [
                            "eid11479",
                            "display",
                            25750,
                            0,
                            "linear",
                            "${guide}",
                            'none',
                            'block'
                        ],
                        [
                            "eid11324",
                            "scaleX",
                            21000,
                            500,
                            "easeInBack",
                            "${order-btn}",
                            '1',
                            '0'
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
                            "eid11471",
                            "width",
                            7500,
                            0,
                            "easeInOutQuad",
                            "${Text}",
                            '100%',
                            '100%'
                        ],
                        [
                            "eid11368",
                            "rotateZ",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy}",
                            '0deg',
                            '27deg'
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
                            8000,
                            500,
                            "easeInOutQuad",
                            "${Text}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11319",
                            "scaleX",
                            19855,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy5}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10874",
                            "left",
                            11500,
                            1000,
                            "easeOutCubic",
                            "${moveHand2}",
                            '30.6%',
                            '9.72%'
                        ],
                        [
                            "eid10904",
                            "left",
                            14124,
                            1126,
                            "easeInOutQuad",
                            "${moveHand2}",
                            '9.72%',
                            '75.87%'
                        ],
                        [
                            "eid10938",
                            "left",
                            16500,
                            634,
                            "easeOutCubic",
                            "${moveHand2}",
                            '75.87%',
                            '51.71%'
                        ],
                        [
                            "eid11283",
                            "opacity",
                            18500,
                            250,
                            "easeOutQuad",
                            "${moveHand2Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11321",
                            "opacity",
                            19388,
                            362,
                            "easeInBack",
                            "${moveHand2Copy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11216",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${Group3}",
                            '-27.22%',
                            '-20.56%'
                        ],
                        [
                            "eid11418",
                            "opacity",
                            22378,
                            244,
                            "easeOutCubic",
                            "${Ellipse}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11215",
                            "scaleY",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${Group3}",
                            '1',
                            '0.37'
                        ],
                        [
                            "eid11393",
                            "opacity",
                            22891,
                            750,
                            "easeInOutQuad",
                            "${TextCopy4}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10930",
                            "scaleX",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_03}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid11305",
                            "scaleX",
                            19605,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy}",
                            '1',
                            '0'
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
                            "eid11217",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${Group3}",
                            '25.42%',
                            '21.19%'
                        ],
                        [
                            "eid11391",
                            "scaleY",
                            20000,
                            750,
                            "easeInBack",
                            "${TextCopy3}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11237",
                            "left",
                            11500,
                            1000,
                            "easeInOutQuad",
                            "${moveHand2Copy}",
                            '30.6%',
                            '9.72%'
                        ],
                        [
                            "eid11238",
                            "left",
                            14124,
                            1126,
                            "easeInOutQuad",
                            "${moveHand2Copy}",
                            '9.72%',
                            '75.87%'
                        ],
                        [
                            "eid11277",
                            "left",
                            18500,
                            0,
                            "easeOutQuad",
                            "${moveHand2Copy}",
                            '75.87%',
                            '74.82%'
                        ],
                        [
                            "eid11279",
                            "left",
                            18750,
                            638,
                            "easeOutQuad",
                            "${moveHand2Copy}",
                            '74.82%',
                            '51.99%'
                        ],
                        [
                            "eid11193",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy5}",
                            '40.44%',
                            '-0.67%'
                        ],
                        [
                            "eid11370",
                            "opacity",
                            23398,
                            101,
                            "easeInOutQuad",
                            "${credentials_064Copy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10868",
                            "scaleY",
                            9250,
                            2500,
                            "easeOutElastic",
                            "${cut_01}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10928",
                            "scaleX",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_01}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid11371",
                            "left",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy2}",
                            '34.16%',
                            '34.74%'
                        ],
                        [
                            "eid11405",
                            "left",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064Copy2}",
                            '34.74%',
                            '116.13%'
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
                            "eid11231",
                            "background-color",
                            17877,
                            766,
                            "easeInOutQuad",
                            "${Ellipse}",
                            'rgba(0,188,164,1)',
                            'rgba(228,178,0,1.00)'
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
                            "eid11223",
                            "scaleY",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${credentials_063}",
                            '2.7',
                            '1'
                        ],
                        [
                            "eid11135",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy6}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11420",
                            "opacity",
                            25370,
                            380,
                            "easeOutCubic",
                            "${Rectangle}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10929",
                            "scaleY",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_01}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid11312",
                            "top",
                            19750,
                            1145,
                            "easeInBack",
                            "${credentials_063Copy4}",
                            '31.8%',
                            '66.86%'
                        ],
                        [
                            "eid11459",
                            "scaleX",
                            15000,
                            0,
                            "easeInOutQuad",
                            "${photo_02}",
                            '1',
                            '1'
                        ],
                        [
                            "eid11456",
                            "scaleX",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_02}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid11416",
                            "opacity",
                            3500,
                            500,
                            "easeOutCubic",
                            "${moveHand}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11304",
                            "top",
                            19605,
                            1145,
                            "easeInBack",
                            "${credentials_063Copy}",
                            '31.8%',
                            '66.86%'
                        ],
                        [
                            "eid10794",
                            "top",
                            457,
                            730,
                            "easeOutQuad",
                            "${word}",
                            '51.43%',
                            '44.28%'
                        ],
                        [
                            "eid11330",
                            "scaleX",
                            22250,
                            1249,
                            "easeInOutQuad",
                            "${ems}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10933",
                            "left",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_01}",
                            '26.39%',
                            '56%'
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
                            "eid11195",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy7}",
                            '40.44%',
                            '49.1%'
                        ],
                        [
                            "eid11372",
                            "rotateZ",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy2}",
                            '0deg',
                            '16deg'
                        ],
                        [
                            "eid11364",
                            "top",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064}",
                            '44.25%',
                            '32.72%'
                        ],
                        [
                            "eid11408",
                            "top",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064}",
                            '32.72%',
                            '32.61%'
                        ],
                        [
                            "eid11205",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy3}",
                            '-2.82%',
                            '-28.3%'
                        ],
                        [
                            "eid11390",
                            "scaleX",
                            20000,
                            750,
                            "easeInBack",
                            "${TextCopy3}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11374",
                            "opacity",
                            16250,
                            547,
                            "easeInOutQuad",
                            "${TextCopy2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11375",
                            "opacity",
                            17750,
                            519,
                            "linear",
                            "${TextCopy2}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11306",
                            "scaleY",
                            19605,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10917",
                            "opacity",
                            15000,
                            250,
                            "easeOutElastic",
                            "${photo_03}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10946",
                            "opacity",
                            17134,
                            743,
                            "easeOutCubic",
                            "${photo_03}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11354",
                            "left",
                            22250,
                            1250,
                            "easeOutQuad",
                            "${ems}",
                            '-26.91%',
                            '26.93%'
                        ],
                        [
                            "eid11413",
                            "left",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${ems}",
                            '26.93%',
                            '108.35%'
                        ],
                        [
                            "eid11262",
                            "filter.invert",
                            19388,
                            112,
                            "easeInOutQuad",
                            "${order-btn}",
                            '0.000000',
                            '0.28'
                        ],
                        [
                            "eid11263",
                            "filter.invert",
                            19500,
                            105,
                            "easeInOutQuad",
                            "${order-btn}",
                            '0.280000',
                            '0'
                        ],
                        [
                            "eid11384",
                            "opacity",
                            18384,
                            495,
                            "easeInOutQuad",
                            "${TextCopy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10867",
                            "scaleX",
                            9250,
                            2500,
                            "easeOutElastic",
                            "${cut_01}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11444",
                            "scaleX",
                            12750,
                            500,
                            "easeInOutSine",
                            "${cut_01}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11435",
                            "opacity",
                            12750,
                            500,
                            "easeInOutQuad",
                            "${cut_02}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11199",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy4}",
                            '40.44%',
                            '49.1%'
                        ],
                        [
                            "eid11356",
                            "width",
                            23500,
                            0,
                            "easeInQuad",
                            "${ems}",
                            '50.1%',
                            '50.1%'
                        ],
                        [
                            "eid11455",
                            "opacity",
                            14924,
                            76,
                            "easeInOutQuad",
                            "${photo_02}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11229",
                            "opacity",
                            17134,
                            743,
                            "easeOutCubic",
                            "${photo_02}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10898",
                            "opacity",
                            12750,
                            1374,
                            "easeOutElastic",
                            "${TextCopy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10913",
                            "opacity",
                            15312,
                            750,
                            "easeOutElastic",
                            "${TextCopy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10947",
                            "opacity",
                            17134,
                            743,
                            "easeOutCubic",
                            "${Group2}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11367",
                            "left",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy}",
                            '34.16%',
                            '34.74%'
                        ],
                        [
                            "eid11409",
                            "left",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064Copy}",
                            '34.74%',
                            '116.13%'
                        ],
                        [
                            "eid11362",
                            "rotateZ",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064}",
                            '0deg',
                            '29deg'
                        ],
                        [
                            "eid11394",
                            "scaleY",
                            24248,
                            750,
                            "easeInBack",
                            "${TextCopy4}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11285",
                            "opacity",
                            19108,
                            497,
                            "easeInOutQuad",
                            "${credentials_063Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11314",
                            "scaleY",
                            19750,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy4}",
                            '1',
                            '0'
                        ],
                        [
                            "eid10944",
                            "opacity",
                            17134,
                            743,
                            "easeOutCubic",
                            "${moveHand2}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11140",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy4}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11133",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy7}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid10931",
                            "scaleY",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_03}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid10932",
                            "left",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_03}",
                            '26.39%',
                            '-3.57%'
                        ],
                        [
                            "eid11197",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy2}",
                            '40.44%',
                            '-0.68%'
                        ],
                        [
                            "eid11478",
                            "display",
                            25750,
                            0,
                            "linear",
                            "${download2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid11318",
                            "scaleY",
                            19855,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy5}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11366",
                            "opacity",
                            23398,
                            101,
                            "easeInOutQuad",
                            "${credentials_064Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11134",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy6}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11132",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy7}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11214",
                            "scaleX",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${Group3}",
                            '1',
                            '0.37'
                        ],
                        [
                            "eid11137",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy2}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11225",
                            "opacity",
                            18174,
                            469,
                            "easeInOutQuad",
                            "${credentials_063}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11307",
                            "opacity",
                            18643,
                            0,
                            "easeInQuad",
                            "${credentials_063}",
                            '1',
                            '1'
                        ],
                        [
                            "eid11309",
                            "opacity",
                            19388,
                            217,
                            "easeInQuad",
                            "${credentials_063}",
                            '1',
                            '0'
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
                            "eid10901",
                            "top",
                            12750,
                            1374,
                            "easeOutElastic",
                            "${TextCopy}",
                            '14.48%',
                            '6.95%'
                        ],
                        [
                            "eid11358",
                            "opacity",
                            23398,
                            101,
                            "easeInOutQuad",
                            "${credentials_064}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11335",
                            "left",
                            22891,
                            609,
                            "easeInOutQuad",
                            "${hand}",
                            '101.18%',
                            '62.5%'
                        ],
                        [
                            "eid11411",
                            "left",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${hand}",
                            '62.5%',
                            '143.91%'
                        ],
                        [
                            "eid11130",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy8}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11234",
                            "top",
                            11500,
                            1000,
                            "easeInOutQuad",
                            "${moveHand2Copy}",
                            '103.1%',
                            '82.49%'
                        ],
                        [
                            "eid11278",
                            "top",
                            18500,
                            0,
                            "easeOutQuad",
                            "${moveHand2Copy}",
                            '82.49%',
                            '104.98%'
                        ],
                        [
                            "eid11280",
                            "top",
                            18750,
                            638,
                            "easeOutQuad",
                            "${moveHand2Copy}",
                            '104.98%',
                            '80.4%'
                        ],
                        [
                            "eid11196",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy6}",
                            '40.61%',
                            '24%'
                        ],
                        [
                            "eid11203",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy6}",
                            '-2.64%',
                            '24.93%'
                        ],
                        [
                            "eid11315",
                            "scaleX",
                            19750,
                            1145,
                            "easeInQuad",
                            "${credentials_063Copy4}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11355",
                            "top",
                            22250,
                            1250,
                            "easeInOutQuad",
                            "${ems}",
                            '5.63%',
                            '43.39%'
                        ],
                        [
                            "eid11414",
                            "top",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${ems}",
                            '43.39%',
                            '43.25%'
                        ],
                        [
                            "eid11423",
                            "opacity",
                            25750,
                            750,
                            "linear",
                            "${download2}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11369",
                            "top",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064Copy2}",
                            '44.25%',
                            '36.25%'
                        ],
                        [
                            "eid11406",
                            "top",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064Copy2}",
                            '36.25%',
                            '36.16%'
                        ],
                        [
                            "eid11412",
                            "top",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${hand}",
                            '62.7%',
                            '62.51%'
                        ],
                        [
                            "eid11392",
                            "scaleX",
                            24248,
                            750,
                            "easeInBack",
                            "${TextCopy4}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11202",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy7}",
                            '-2.64%',
                            '24.93%'
                        ],
                        [
                            "eid11440",
                            "opacity",
                            13250,
                            519,
                            "easeInOutQuad",
                            "${cut_01}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11227",
                            "opacity",
                            16852,
                            282,
                            "easeInOutQuad",
                            "${Group3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11311",
                            "opacity",
                            19388,
                            217,
                            "easeInOutQuad",
                            "${Group3}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11331",
                            "scaleY",
                            22250,
                            1249,
                            "easeInOutQuad",
                            "${ems}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11194",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy8}",
                            '40.44%',
                            '78.81%'
                        ],
                        [
                            "eid11198",
                            "left",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy3}",
                            '40.61%',
                            '24%'
                        ],
                        [
                            "eid11136",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy2}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11363",
                            "left",
                            23499,
                            1001,
                            "easeInOutQuad",
                            "${credentials_064}",
                            '34.16%',
                            '36.95%'
                        ],
                        [
                            "eid11407",
                            "left",
                            25250,
                            1000,
                            "easeOutCubic",
                            "${credentials_064}",
                            '36.95%',
                            '118.35%'
                        ],
                        [
                            "eid11379",
                            "scaleX",
                            16250,
                            547,
                            "easeOutQuart",
                            "${TextCopy2}",
                            '0',
                            '1'
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
                            "eid11317",
                            "opacity",
                            19108,
                            497,
                            "easeInOutQuad",
                            "${credentials_063Copy5}",
                            '0',
                            '1'
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
                            "eid11458",
                            "scaleY",
                            15000,
                            0,
                            "easeInOutQuad",
                            "${photo_02}",
                            '1',
                            '1'
                        ],
                        [
                            "eid11457",
                            "scaleY",
                            15250,
                            1250,
                            "easeInOutQuad",
                            "${photo_02}",
                            '1',
                            '0.62'
                        ],
                        [
                            "eid10873",
                            "top",
                            11500,
                            1000,
                            "easeOutCubic",
                            "${moveHand2}",
                            '103.1%',
                            '82.49%'
                        ],
                        [
                            "eid10939",
                            "top",
                            16500,
                            634,
                            "easeOutCubic",
                            "${moveHand2}",
                            '82.49%',
                            '45.93%'
                        ],
                        [
                            "eid11200",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy5}",
                            '-2.57%',
                            '24.88%'
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
                            "eid11139",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy3}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11424",
                            "opacity",
                            25750,
                            750,
                            "linear",
                            "${guide}",
                            '0',
                            '1'
                        ],
                        [
                            "eid11129",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy5}",
                            '0.62',
                            '0.62'
                        ],
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
                            "eid11206",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy4}",
                            '-2.82%',
                            '-28.3%'
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
                            "eid11204",
                            "top",
                            17134,
                            1250,
                            "easeInOutQuad",
                            "${photo_02Copy2}",
                            '-2.76%',
                            '-28.36%'
                        ],
                        [
                            "eid10916",
                            "opacity",
                            15000,
                            250,
                            "easeOutElastic",
                            "${photo_01}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10945",
                            "opacity",
                            17134,
                            743,
                            "easeOutCubic",
                            "${photo_01}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11141",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy4}",
                            '0.62',
                            '0.62'
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
                            '49.7%'
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
                            "eid11128",
                            "scaleX",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy5}",
                            '0.62',
                            '0.62'
                        ],
                        [
                            "eid11341",
                            "left",
                            21500,
                            750,
                            "easeInOutQuart",
                            "${Rectangle}",
                            '100%',
                            '0%'
                        ],
                        [
                            "eid11447",
                            "scaleX",
                            13250,
                            519,
                            "easeInOutSine",
                            "${cut_02}",
                            '0',
                            '1'
                        ],
                        [
                            "eid10934",
                            "scaleX",
                            15250,
                            812,
                            "easeOutBack",
                            "${cut_02}",
                            '1',
                            '0'
                        ],
                        [
                            "eid11131",
                            "scaleY",
                            18384,
                            0,
                            "easeInOutQuad",
                            "${photo_02Copy8}",
                            '0.62',
                            '0.62'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("demo_edgeActions.js");
})("EDGE-455333329");

export const demoForm = [
    {
        "sectionStyle": "bold",
        "sectionValues": [
            "YES"
        ],
        "sectionValidation": {
            "minCount": 1
        },
        "name": "segmentType",
        "title": "1. Are you?",
        "subtitle": "Required",
        "position": 0,
        "items": [
            {
                "actionReloadsTable": true,
                "actionUpdatesSectionValue": true,
                "segments": [
                    {
                        "label": "YES",
                        "optionValue": "YES"
                    },
                    {
                        "label": "NO",
                        "optionValue": "NO"
                    }
                ],
                "fieldValidations": {
                    "rules": [
                        {
                            "minLength": 1
                        }
                    ]
                },
                "name": "canYouDoThis",
                "type": "segments",
                "value": "YES",
                "position": 0
            },
            {
                "fieldValidations": {
                    "rules": [
                        {
                            "minLength": 1,
                            "numeric": true
                        }
                    ]
                },
                "name": "id",
                "type": "string",
                "label": "ID",
                "hint": "Required. Numeric.",
                "position": 1
            },
            {
                "name": "voice",
                "type": "voice",
                "label": "Voice Message",
                "hint": "",
                "position": 1
            },
            {
                "name": "file",
                "type": "file",
                "label": "Images",
                "fileType": "image",
                "multiple": true,
                "hint": "",
                "position": 1,
                "value": [
                    {
                        url:'https://cdn.pixabay.com/photo/2020/06/01/22/23/eye-5248678__340.jpg',
                        name:'eye.jpg'
                    }
                ]
            },
            {
                "fieldValidations": {
                    "rules": [
                        {
                            "minLength": 1
                        }
                    ]
                },
                "name": "dob",
                "type": "date",
                "label": "Date of Birth",
                "hint": "Required",
                "position": 2
            }
        ]
    },
    {
        "sectionValidation": {
            "minCount": 1
        },
        "name": "content",
        "title": "2. What about this?",
        "subtitle": "Required",
        "position": 3,
        "items": [
            {
                "items": [
                    {
                        "label": "Excellent",
                        "optionValue": "Excellent"
                    },
                    {
                        "label": "Very Good",
                        "optionValue": "Very Good"
                    },
                    {
                        "label": "Fair",
                        "optionValue": "Fair"
                    },
                    {
                        "label": "Poor",
                        "optionValue": "Poor"
                    }
                ],
                "isSectionValueItem": true,
                "fieldValidation": {
                    "minCount": 1
                },
                "errors": [],
                "name": "content",
                "type": "radio",
                "position": 0
            }
        ]
    },
    {
        "sectionStyle": "bold",
        "title": "3. Describe something",
        "subtitle": "Required",
        "position": 6,
        "items": [
            {
                "singleSectionMode": true,
                "fieldValidations": {
                    "rules": [
                        {
                            "minLength": 1
                        }
                    ]
                },
                "name": "description",
                "type": "text",
                "label": "Type your comments here…",
                "position": 0
            }
        ]
    }
]

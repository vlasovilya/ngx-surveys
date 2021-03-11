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
                "position": 0,
                "value": "Very Good"
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

module.exports = {

    createJenkinsApiResponse: function (result, jobName, buildId) {
        return JSON.stringify({
            actions: [
                {},
                {},
                {
                    "causes": [
                        {
                            "shortDescription": "Started by upstream project \"iceberg-trigger\" build number 5,531",
                            "upstreamBuild": 5531,
                            "upstreamProject": "iceberg-trigger",
                            "upstreamUrl": "job/iceberg-trigger/"
                    }
                ]
            },
                {},
                {},
                {},
                {},
                {
                    "failCount": 11,
                    "skipCount": 0,
                    "totalCount": 53,
                    "urlName": "testReport",
                    buildsByBranchName: {
                      'origin/master': {},
                      'origin/release_1.0.0': {},
                      'origin/NTI-850-APIPermissions': {}
                  }
            },
                {},
                {}
        ],
            artifacts: [
                {
                    "displayPath": "admin_user_can_create_protected_page_and_is_not_shown_delete_button_on_page_list.png",
                    "fileName": "admin_user_can_create_protected_page_and_is_not_shown_delete_button_on_page_list.png",
                    "relativePath": "screenshots/admin_user_can_create_protected_page_and_is_not_shown_delete_button_on_page_list.png"
            },
                {
                    "displayPath": "buttons_enabled_(false)_and_the_invalid_slug_error_is_hiddenshown_correctly_when_abc!_is_entered.png",
                    "fileName": "buttons_enabled_(false)_and_the_invalid_slug_error_is_hiddenshown_correctly_when_abc!_is_entered.png",
                    "relativePath": "screenshots/buttons_enabled_(false)_and_the_invalid_slug_error_is_hiddenshown_correctly_when_abc!_is_entered.png"
            },
                {
                    "displayPath": "can_switch_to_configure_mode_and_back.png",
                    "fileName": "can_switch_to_configure_mode_and_back.png",
                    "relativePath": "screenshots/can_switch_to_configure_mode_and_back.png"
            },
                {
                    "displayPath": "save_after_change_made_with_a_toggle_disabled_save_button.png",
                    "fileName": "save_after_change_made_with_a_toggle_disabled_save_button.png",
                    "relativePath": "screenshots/save_after_change_made_with_a_toggle_disabled_save_button.png"
            },
                {
                    "displayPath": "should_not_allow_uppercase_characters_in_page_slugs.png",
                    "fileName": "should_not_allow_uppercase_characters_in_page_slugs.png",
                    "relativePath": "screenshots/should_not_allow_uppercase_characters_in_page_slugs.png"
            },
                {
                    "displayPath": "should_only_update_layout_for_current_variant.png",
                    "fileName": "should_only_update_layout_for_current_variant.png",
                    "relativePath": "screenshots/should_only_update_layout_for_current_variant.png"
            },
                {
                    "displayPath": "should_set_page_metadata.png",
                    "fileName": "should_set_page_metadata.png",
                    "relativePath": "screenshots/should_set_page_metadata.png"
            },
                {
                    "displayPath": "should_update_all_variants_when_protected_metadata_toggle_is_updated_on_one_variant.png",
                    "fileName": "should_update_all_variants_when_protected_metadata_toggle_is_updated_on_one_variant.png",
                    "relativePath": "screenshots/should_update_all_variants_when_protected_metadata_toggle_is_updated_on_one_variant.png"
            },
                {
                    "displayPath": "should_update_all_variants_when_the_metadata_description_field_is_updated_on_one_variant.png",
                    "fileName": "should_update_all_variants_when_the_metadata_description_field_is_updated_on_one_variant.png",
                    "relativePath": "screenshots/should_update_all_variants_when_the_metadata_description_field_is_updated_on_one_variant.png"
            },
                {
                    "displayPath": "should_warn_user_about_the_losing_of_the_old_module_data.png",
                    "fileName": "should_warn_user_about_the_losing_of_the_old_module_data.png",
                    "relativePath": "screenshots/should_warn_user_about_the_losing_of_the_old_module_data.png"
            },
                {
                    "displayPath": "user_can_select_Countdown_Timer_module_and_see_countdown_timer_in_the_rendered_page.png",
                    "fileName": "user_can_select_Countdown_Timer_module_and_see_countdown_timer_in_the_rendered_page.png",
                    "relativePath": "screenshots/user_can_select_Countdown_Timer_module_and_see_countdown_timer_in_the_rendered_page.png"
            }
        ],
            building: false,
            description: "Testing (chrome) Shard 2 tests on branch iceberg_update_9June",
            displayName: "#725",
            duration: 155674,
            estimatedDuration: 156273,
            executor: null,
            fullDisplayName: jobName + " #" + buildId.toString(),
            id: buildId.toString(),
            keepLog: false,
            number: 124,
            queueId: 24908,
            result: result.toUpperCase(),
            timestamp: 1434377016303,
            url: "http://build.nowtv.bskyb.com/view/6.%20Iceberg/job/" + jobName + "/" + buildId + "/",
            builtOn: "testNode",
            changeSet: {
                "items": [
                    {
                        "affectedPaths": [
                        "angular-app/test/e2e/protractor/page/edit/edit-page-page.js"
                    ],
                        "commitId": "90da3a0d226caec7bcf4e012308ed56cb7687536",
                        "timestamp": 1435163479000,
                        "author": {
                            "absoluteUrl": "http://build.nowtv.bskyb.com/user/dl-nowtv-icebergteam",
                            "fullName": "DL-NowTV-IcebergTeam"
                        },
                        "comment": "#495 @alex doing a test commit",
                        "date": "2015-06-24 17:31:19 +0100",
                        "id": "90da3a0d226caec7bcf4e012308ed56cb7687536",
                        "msg": "#495 @alex doing a test commit",
                        "paths": [
                            {
                                "editType": "edit",
                                "file": "angular-app/test/e2e/protractor/page/edit/edit-page-page.js"
                        }
                    ]
                }
            ],
                "kind": "git"
            },
            culprits: [{
                absoluteUrl: "http://build.nowtv.bskyb.com/user/dl-nowtv-icebergteam",
                fullName: "DL-NowTV-IcebergTeam"
        }]
        })

    }
};

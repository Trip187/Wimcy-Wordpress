<?php

function my_theme_child_enqueue_assets()
{
    // ----------------------------
    // Load parent + child CSS
    // ----------------------------
    wp_enqueue_style(
        'parent-style',
        get_template_directory_uri() . '/style.css'
    );

    wp_enqueue_style(
        'child-style',
        get_stylesheet_uri(),
        array('parent-style')
    );

    // ----------------------------
    // Stop React in admin (fixes editor)
    // ----------------------------
    if (is_admin()) {
        return;
    }

    // ----------------------------
    // React build assets (FRONTEND ONLY)
    // ----------------------------

    // CSS bundle
    wp_enqueue_style(
        'react-app-style',
        get_stylesheet_directory_uri() . '/react-app/dist/assets/index-JPP1bbNy.css',
        array(),
        null
    );

    // JS bundle
    wp_enqueue_script(
        'react-app',
        get_stylesheet_directory_uri() . '/react-app/dist/assets/index-CiQeNqBR.js',
        array(),
        null,
        true
    );

    // Make the JS file load as type="module"
    wp_script_add_data('react-app', 'type', 'module');
}

add_action('wp_enqueue_scripts', 'my_theme_child_enqueue_assets');

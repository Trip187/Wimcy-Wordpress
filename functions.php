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
    // Stop React in admin
    // ----------------------------
    if (is_admin()) {
        return;
    }

    // ----------------------------
    // React build assets
    // ----------------------------

    // CSS bundle
    wp_enqueue_style(
        'react-app-style',
        get_stylesheet_directory_uri() . '/react-app/dist/assets/index-qOf--XZO.css',
        array(),
        null
    );

    // JS bundle (use the latest build hash so we don’t need to update this manually)
    $jsFiles = glob(get_stylesheet_directory() . '/react-app/dist/assets/index-*.js');
    $jsFile  = $jsFiles ? str_replace(get_stylesheet_directory(), get_stylesheet_directory_uri(), $jsFiles[0]) : get_stylesheet_directory_uri() . '/react-app/dist/assets/index-DJaypru8.js';

    wp_enqueue_script(
        'react-app',
        $jsFile,
        array(),
        null,
        true
    );

    // ✅ Mark script as ES module (CRITICAL for Vite)
    wp_script_add_data('react-app', 'type', 'module');

    // ✅ Provide theme asset base URL to React
    wp_add_inline_script(
        'react-app',
        'window.THEME_ASSETS_URL = "' . get_stylesheet_directory_uri() . '/assets";',
        'before'
    );
}

add_action('wp_enqueue_scripts', 'my_theme_child_enqueue_assets');

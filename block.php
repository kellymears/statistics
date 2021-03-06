<?php
/**
 * Plugin Name: Statistics block
 * Version:     0.0.1
 * Author:      Kelly Mears <kelly@roots.io>
 * License:     MIT
 * Text Domain: tiny-pixel.
 */

/**
 * Register tiny-pixel/blokes with the block registry.
 *
 * @see Enqueueing Editor Assets <https://git.io/JvPHy>
 * @see Dependency Extraction Webpack Plugin <https://git.io/Jv1ll>
 */
add_action('init', function () {
    (new class() {
        /**
         * Blocks.
         *
         * @static array
         */
        public static $blocks = [
            'tiny-pixel/statistics',
        ];

        /**
         * Plugin root directory.
         *
         * @static string
         */
        public static $dir;

        /**
         * Webpack dependencies.
         *
         * @static array
         */
        public static $manifest;

        /**
         * Class constructor.
         *
         * @throws \WP_Error
         */
        public function __construct()
        {
            /* Set plugin root dir reference */
            self::$dir = dirname(__FILE__);

            /*
             * Throw an error if the dependency manifest has not
             * been generated or is otherwise not found.
             */
            if (!realpath($manifestSrc = self::$dir . '/dist/editor.asset.json')) {
                throw new \WP_Error(
                    'manifest_not_found',
                    'There was an issue registering '.self::$name,
                    "Run 'npm build' in ".self::$dir
                );
            }

            /** Process webpack dependency manifest */
            $manifest = file_get_contents($manifestSrc);
            self::$manifest = array_values(json_decode($manifest, true));
        }

        /**
         * Class invocation.
         */
        public function __invoke(): void
        {
            foreach (self::$blocks as $block) {
                /*
                 * Register the editor script.
                 */
                if (realpath(self::$dir . '/dist/editor.js')) {
                    wp_register_script(
                        "{$block}/editor/js",
                        plugins_url('dist/editor.js', __FILE__),
                        ...self::$manifest
                    );
                }

                /*
                 * Register block styles.
                 */
                foreach (['editor', 'public'] as $styleName) {
                    if (realpath(self::$dir . "/dist/{$styleName}.css")) {
                        wp_register_style(
                            "{$block}/{$styleName}/css",
                            plugins_url("dist/{$styleName}.css", __FILE__),
                            [],
                            null
                        );
                    }
                }
            }

            /*
             * Register the block.
             */
            register_block_type($block, [
                'editor_script' => "{$block}/editor/js",
                'editor_style' => "{$block}/editor/css",
                'style' => "{$block}/public/css",
                'script' => "{$block}/public/js",
            ]);
        }
    })();
});

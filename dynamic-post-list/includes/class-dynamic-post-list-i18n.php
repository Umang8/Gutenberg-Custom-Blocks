<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://www.multidots.com/
 * @since      1.0.0
 *
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/includes
 * @author     Multidots <umang.bhanvadia@multidots.com>
 */
class Dynamic_Post_List_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'dynamic-post-list',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}

<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.multidots.com/
 * @since      1.0.0
 *
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/admin
 * @author     Multidots <umang.bhanvadia@multidots.com>
 */
class Dynamic_Post_List_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Dynamic_Post_List_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Dynamic_Post_List_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/dynamic-post-list-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Dynamic_Post_List_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Dynamic_Post_List_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/dynamic-post-list-admin.js', array( 'jquery' ), $this->version, false );
        wp_enqueue_script('posts-list-block', plugin_dir_url(__FILE__) . 'js/block/block.build.js', array( 'jquery', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-core-data', 'wp-api-fetch' ), $this->version, false);
		wp_localize_script( $this->plugin_name, 'myAjax', array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),'ajax_nonce' => wp_create_nonce('fetch_nonce'))
		);
    }

    public function rest_api_callback() {
        register_rest_route('post_type/v1', '/post_data/', array(
            'methods' => 'GET',
            'callback' => 'rest_get_all_post_types',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('post_type/v1', '/post_list/', array(
            'methods' => 'GET',
            'callback' => 'rest_get_all_posts',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('post_type/v1', '/post_taxonomies/', array(
            'methods' => 'GET',
            'callback' => 'rest_get_all_post_taxonomies',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('post_type/v1', '/post_category/', array(
            'methods' => 'GET',
            'callback' => 'rest_get_all_post_categories',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('post_type/v1', '/post_term/', array(
            'methods' => 'GET',
            'callback' => 'rest_get_term_posts',
            'permission_callback' => '__return_true',
        ));
        register_rest_route('post_type/v1', '/edulevel/', array(
			'methods' => 'GET',
			'callback' => 'rest_get_edulevel',
			'permission_callback' => '__return_true',
		));
		register_rest_route('post_type/v1', '/specializations/', array(
			'methods' => 'GET',
			'callback' => 'rest_get_specializations',
			'permission_callback' => '__return_true',
		));
    }

    public function md_custom_post_all_posts() {

        register_block_type('select-post-list/post-list-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_post_data',
                'attributes' => array(
                    'postId' => array(
                        'type' => 'object',
                        'default' => []

                    ),
                    'postType' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
					'postOrderBy' => array(
						'type' => 'string',
						'default' => ''
					),
					'postOrder' => array(
						'type' => 'string',
						'default' => ''
					)
                )
            )
        );

        register_block_type('select-post-list/latest-post-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_latest_posts',
            )
        );

		register_block_type('nps-post-list/latest-schools-list',
			array(
				'editor_script' => 'posts-list-block',
				'render_callback' => 'latest_schools_list',
				'attributes' => array(
					'postType' => array(
						'type' => 'string',
						'default' => ''
					)
				)
			)
		);

        register_block_type( 'contributors-block-section/childpages', array(
            'render_callback' => 'contributors_block_section',
            'editor_script' => 'posts-list-block',
        ));

		register_block_type( 'contributors-list-section/childpages', array(
			'render_callback' => 'contributors_list_section',
			'editor_script' => 'posts-list-block',
		));

		register_block_type( 'experts-list-section/childpages', array(
			'render_callback' => 'experts_list_section',
			'editor_script' => 'posts-list-block',
		));

        register_block_type( 'nps-search-box/searchbox', array(
            'render_callback' => 'nps_search_box_block',
            'editor_script' => 'posts-list-block',
            'attributes' => array(
                'eduLevel' => array(
					'type' => "string",
				),
				'specialization' => array(
					'type' => "string",
				),
				'fbSpecialization' => array(
					'type' => "string",
					'default' => "",
				),
				'isOptionsLoaded' => array(
					'type' => "boolean",
					'default' => false
				),
            )
        ));

        register_block_type( 'cs-search-box/horizontal-searchbox', array(
            'render_callback' => 'cs_horizontal_search_box_block',
            'editor_script' => 'posts-list-block',
            'attributes' => array(
				'eduLevel' => array(
					'type' => "string",
				),
				'specialization' => array(
					'type' => "string",
				),
				'fbSpecialization' => array(
					'type' => "string",
				),
            )
        ));

        register_block_type( 'cs-placement-button/searchbox', array(
            'render_callback' => 'cs_placement_button_block',
            'editor_script' => 'posts-list-block',
            'attributes' => array(
				'eduLevel' => array(
					'type'    => 'string',
					'default' => 'hs diploma'
				),
				'specialization' => array(
					'type'    => 'string',
					'default' => ''
				),
				'fbSpecialization' => array(
					'type'    => 'string',
					'default' => ''
				),
				'btnText' => array(
					'type'    => 'string',
					'default' => 'View Schools'
				),
				'linkText' => array(
					'type'    => 'string',
					'default' => 'sponsored'
				),
				'isOptionsLoaded' => array(
					'type'    => 'boolean',
					'default' => false
				),
			),
        ));

        register_block_type('select-post-list/all-posts-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_all_posts',
                'attributes' => array(
                    'postType' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'postOrderBy' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'postOrder' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
					'postPerPage' => array(
						'type' => 'string',
						'default' => ''
					),
                )
            )
		);
		
		register_block_type('select-post-list/category-blogs-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_category_blogs',
                'attributes' => array(
					'catId' => array(
						'type' => 'object',
						'default' => []
					),
                    'postType' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
					'postTaxonomy'=> array(
						'type' => 'string',
						'default' => ''
					),
					'categoryList'=> array(
						'type' => 'object',
						'default' => []
					),
					'taxonomyList'=> array(
						'type' => 'object',
						'default' => []
					),
					'postPerPage' => array(
						'type' => 'number',
						'default' => 10
					),
                )
            )
        );

        register_block_type('select-post-list/category-posts-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_category_posts',
                'attributes' => array(
					'catId' => array(
						'type' => 'object',
						'default' => []
					),
                    'postType' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
					'postTaxonomy'=> array(
						'type' => 'string',
						'default' => ''
					),
					'categoryList'=> array(
						'type' => 'object',
						'default' => []
					),
					'taxonomyList'=> array(
						'type' => 'object',
						'default' => []
					)
                )
            )
        );

        register_block_type('select-post-list/license-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_license_post',
                'attributes' => array(
                    'postId' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'postCategory'=> array(
                        'type' => 'string',
                    ),
                    'categoryList'=> array(
                        'type' => 'object',
                        'default' => []
                    ),
                    'postLists'=> array(
                        'type' => 'array',
                        'items' => array('type' => 'object')
                    )
                )
            )
        );

        register_block_type('select-post-list/license-career-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_license_list',
                'attributes' => array(
                    'postCategory'=> array(
                        'type' => 'string',
                    ),
                    'categoryList'=> array(
                        'type' => 'object',
                        'default' => []
                    ),
                    'postLists'=> array(
                        'type' => 'array',
                    )
                )
            )
        );

        register_block_type('select-post-list/faq-block',
            array(
                'editor_script' => 'posts-list-block',
                'render_callback' => 'get_category_faqs',
                'attributes' => array(
                    'catId' => array(
                        'type' => 'object',
                        'default' => []
                    ),
                    'postType' => array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'postTaxonomy'=> array(
                        'type' => 'string',
                        'default' => ''
                    ),
                    'categoryList'=> array(
                        'type' => 'object',
                        'default' => []
                    ),
                    'taxonomyList'=> array(
                        'type' => 'object',
                        'default' => []
                    ),
                    'faqOrderBy' => array(
                        'type' => 'string',
                        'default' => 'title'
                    ),
                    'faqOrder' => array(
                        'type' => 'string',
                        'default' => 'asc'
                    )
                )
            )
        );

        register_block_type('detail-page-section/progress-bar-block', array(
            'editor_script' => 'posts-list-block',
            'render_callback' => 'get_progress_bar',
		));
		
		register_block_type('detail-page-section/nearby-state-block', array(
            'editor_script' => 'posts-list-block',
            'render_callback' => 'get_nearby_states',
        ));

        register_block_type('detail-page-section/respect-block', array(
            'editor_script' => 'posts-list-block',
            'render_callback' => 'display_page_banner_details',
        ));

		register_block_type( 'related-post-section/related-posts', array(
			'render_callback' => 'related_post_section',
			'editor_script' => 'posts-list-block',
			'attributes' => array(
				'displayRelPrograms' => array(
					'type' => 'boolean',
					'default' => true
				),
				'displayRelCareers' => array(
					'type' => 'boolean',
					'default' => true
				),
				'programsTitle' => array(
					'type' => 'string',
					'default' => ''
				),
				'careersTitle' => array(
					'type' => 'string',
					'default' => ''
				),
				'displayRelBlogs' => array(
					'type' => 'boolean',
					'default' => true
				),
				'blogsTitle' => array(
					'type' => 'string',
					'default' => ''
				),
				'postType' => array(
					'type' => 'string',
					'default' => ''
				),
				'postTypeBlog' => array(
					'type' => 'string',
					'default' => ''
				),
				'postTypeCareers' => array(
					'type' => 'string',
					'default' => ''
				),
				'excludeSelfPost' => array(
					'type' => 'boolean',
					'default' => true
				),
				'excludeSelfBlog' => array(
					'type' => 'boolean',
					'default' => true
				),
				'excludeSelfCareers' => array(
					'type' => 'boolean',
					'default' => true
				),
				'displayLinks' => array(
					'type' => 'string',
					'default' => '7'
				),
				'displayLinksBlog' => array(
					'type' => 'string',
					'default' => '7'
				),
				'displayLinksCareers' => array(
					'type' => 'string',
					'default' => '7'
				),
				'pullPostsBy' => array(
					'type' => 'string',
					'default' => 'primary'
				),
				'pullBlogsBy' => array(
					'type' => 'string',
					'default' => 'primary'
				),
				'pullCareersBy' => array(
					'type' => 'string',
					'default' => 'primary'
				),
			)
		));
	}


}

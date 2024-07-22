<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://www.multidots.com/
 * @since      1.0.0
 *
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Dynamic_Post_List
 * @subpackage Dynamic_Post_List/public
 * @author     Multidots <umang.bhanvadia@multidots.com>
 */
class Dynamic_Post_List_Public {

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
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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

		//wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/dynamic-post-list-public.css', array(), $this->version, 'all' );

	}

	public function display_state_list(){
		
		$category = $_POST['category'];
		$args = array(
			'post_type' => 'cs_licenses',
			'post_status' => 'publish',
			'posts_per_page' => '-1',
			'orderby' => 'title',
			'order' => 'ASC',
			'tax_query' => array(
				array (
					'taxonomy' => 'license_type',
					'field' => 'term_id',
					'terms' => $category,
				)
			)
		);
		$my_query = new WP_Query( $args );
		?>
		<tr>
			<td colspan="4"><a class="state-nm" data-stateid="<?php echo 'all';?>" data-category="<?php echo $category; ?>"><?php echo 'All States';?></a></td>
		</tr>
		<tr>
		<?php
		$a = 1;
		while ($my_query->have_posts()) : $my_query->the_post();?>
		<td><a class="state-nm" data-stateid="<?php echo esc_attr(get_the_ID());?>"><?php echo esc_html(get_the_title());?></a></td>
		<?php
			if($a%4 == 0){?>
				</tr><tr>
			<?php
			}
		$a++;
		endwhile;
		?>
		</tr>
		<?php
		wp_die();
	}

	public function display_selected_state(){
		
		$stateId = $_POST['stateId'];
		$category = $_POST['category'];
		if('all' !== $stateId){
			$args = array(
				'post_type' => 'cs_licenses',
				'post_status' => 'publish',
				'posts_per_page' => '-1',
				'orderby' => 'title',
				'order' => 'ASC',
				'p' => $stateId
			);
		} else {
			$args = array(
				'post_type' => 'cs_licenses',
				'post_status' => 'publish',
				'posts_per_page' => '-1',
				'orderby' => 'title',
				'order' => 'ASC',
				'tax_query' => array(
					array (
						'taxonomy' => 'license_type',
						'field' => 'term_id',
						'terms' => $category,
					)
				)
			);
		}
		$my_query = new WP_Query( $args );
		?>
		
		<?php
		while ($my_query->have_posts()) : $my_query->the_post();
			$content = get_the_content();
			$content = preg_replace('#(<h2.*?>).*?(</h2>)#', '$1$2', $content);
			$content = preg_replace('#(<th.*?>).*?(</th>)#', '$1$2', $content);
			
			$allowed_tags = array('td'=>array('data-title' => array(), 'class' => array()),'ul'=>array('class' => array()),'li'=>array(),'strong'=>array(),'br'=>array(),'a'=>array('href'  => array(),
			'rel'   => array(), 'target' => array()),'i'=>array(),'span'=>array(),'p'=>array());?>

			<tr><td data-title="State"><?php echo esc_html(get_the_title()); ?></td><?php echo wp_kses($content, $allowed_tags); ?></tr>
		<?php
		endwhile;
            ?>
		
		<?php
		wp_die();
	}

	public function get_back_state() {
		$stateId = $_POST['sid'];
		$category = $_POST['category'];
		if('all' !== $stateId){
			$args = array(
				'post_type' => 'cs_licenses',
				'post_status' => 'publish',
				'posts_per_page' => '-1',
				'orderby' => 'title',
				'order' => 'ASC',
				'p' => $stateId
			);
		} else {
			$args = array(
				'post_type' => 'cs_licenses',
				'post_status' => 'publish',
				'posts_per_page' => '-1',
				'orderby' => 'title',
				'order' => 'ASC',
				'tax_query' => array(
					array (
						'taxonomy' => 'license_type',
						'field' => 'term_id',
						'terms' => $category,
					)
				)
			);
		}
	
		$my_query = new WP_Query( $args );
		
		while ($my_query->have_posts()) : $my_query->the_post();
			$content = get_the_content();
			$content = preg_replace('#(<h2.*?>).*?(</h2>)#', '$1$2', $content);
			$content = preg_replace('#(<th.*?>).*?(</th>)#', '$1$2', $content);
			
			$allowed_tags = array('td'=>array( 'class' => array(), 'data-title' => array() ),'ul'=>array('class' => array()),'li'=>array(),'strong'=>array(),'br'=>array(),'a'=>array('href'  => array(),
			'rel'   => array(), 'target' => array()),'i'=>array(),'span'=>array(),'p'=>array());?>
			
			<tr><td data-title="State"><?php echo esc_html(get_the_title()); ?></td><?php echo wp_kses($content, $allowed_tags); ?></tr>
		<?php
		endwhile;
	}

	function return_popup_html( ) {
    
	    $current_id = $_POST['current_id']; 
	    $postss = get_post($current_id); 
	    $html = '';
	    $categories = wp_get_post_terms($current_id,'contributor-type');
	    $contributorUrl = get_post_meta($current_id,'contributor_google_profile',true);
	    $blogFeaturedImage_url = wp_get_attachment_url( get_post_thumbnail_id($current_id) );
	    
	        $html .= '
	        <div id="popup" class="popup-container">
	            <div class="popup-content">
	                <a href="#" class="close-popup">×</a>
	                    
	                                
	                    <div class="blog_page">
	                        <div class="authorpic">';
	                            if (!empty($blogFeaturedImage_url)) { 
	                                $html .= '<img width="170" height="170" class="post-featured-img" src="'.$blogFeaturedImage_url.'" alt="'.$postss->post_title.'" />';
	                            } else { 
	                                $img_url = get_template_directory_uri().'/images/author.jpg';
	                                $html .= '<img src="'.$img_url.'" alt="'.$postss->post_title.'" />';
	                            } 
	                $html .= '</div>
	                        <div class="authorblog">';
	                            $ContributeDataArr  = array();
	                            $html .= '<strong>'.ucfirst($postss->post_title).'</strong>
	                            '.$postss->post_content.'
	                        </div>
	                    </div>
	                                
	                
	                </div>
	        </div>';
	    echo $html;                             
	    die();
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/dynamic-post-list-public.js', array( 'jquery' ), $this->version, false );
		wp_localize_script( $this->plugin_name, 'myAjax', array(
				'ajax_url'   => admin_url( 'admin-ajax.php' ),'ajax_nonce' => wp_create_nonce('fetch_nonce'))
		);
	}

}

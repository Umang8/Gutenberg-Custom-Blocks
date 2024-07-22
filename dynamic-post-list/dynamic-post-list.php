<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://www.multidots.com/
 * @since             1.0.0
 * @package           Dynamic_Post_List
 *
 * @wordpress-plugin
 * Plugin Name:       SECHEL Blocks
 * Plugin URI:        https://www.multidots.com/
 * Description:       This plugin registers which are required for SECHEL projects.
 * Version:           1.0.0
 * Author:            Multidots
 * Author URI:        https://www.multidots.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       dynamic-post-list
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'Dynamic_Post_List_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-dynamic-post-list-activator.php
 */
function activate_Dynamic_Post_List() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dynamic-post-list-activator.php';
	Dynamic_Post_List_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-dynamic-post-list-deactivator.php
 */
function deactivate_Dynamic_Post_List() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-dynamic-post-list-deactivator.php';
	Dynamic_Post_List_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_Dynamic_Post_List' );
register_deactivation_hook( __FILE__, 'deactivate_Dynamic_Post_List' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-dynamic-post-list.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_Dynamic_Post_List() {

	$plugin = new Dynamic_Post_List();
	$plugin->run();

}
run_Dynamic_Post_List();

function sechel_block_category( $categories, $post ) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'sechel-blocks',
				'title' => __( 'SECHEL Blocks', 'sechel-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories_all', 'sechel_block_category', 10, 2);

function rest_get_all_post_types(){
    $optionArray = array();
    $args = array(
        'public'   => true,
        '_builtin' => false
    );

    $operator = 'and';

	$post_types = get_post_types( $args, $operator );
	$exclude = array( 'cs_licenses' );
    foreach ($post_types as $postValue) {
		if( TRUE === in_array( $postValue->name, $exclude ) )
                continue;
        $optionArray[] = array('name' => $postValue->label, 'value' => $postValue->name);
    }
    return $optionArray;
}

function rest_get_all_posts($data){
    $optionArray = array();
    $pType = $data['post_type'];

    $args = array(
        'post_type'   => $pType,
        'post_status' => 'publish',
        'post_parent__not_in' => array(0),
		'posts_per_page' => '-1',
    );

    $post_type = new WP_Query( $args );

    foreach ($post_type->posts as $postValue) {
        if($postValue->featured_title !== '') {
            $optionArray[] = array('name' => $postValue->featured_title, 'value' => $postValue->ID);
        }else{
            $optionArray[] = array('name' => $postValue->post_title, 'value' => $postValue->ID);
        }
    }
    return $optionArray;
}

function rest_get_all_post_taxonomies($data)
{
    $pType = $data['post_type'];
	$taxonomies = get_object_taxonomies($pType, 'objects');
	$t = array();
	foreach ( $taxonomies as $taxonomy ){
        $t[] = array('name' => $taxonomy->label, 'value' => $taxonomy->name);
    }
    return $t;
}

function rest_get_all_post_categories($attributes){
	$pTaxonomy = $attributes['post_taxonomy'];
	$cats = get_terms($pTaxonomy);
	$category = array();
	foreach ( $cats as $c ){
        $category[] = array('name' => $c->name, 'value' => $c->term_id);
    }
    return $category;
}

function rest_get_term_posts($data){
    $termId = $data['term_id'];

    $args=array(
        'post_type' => 'cs_licenses',
        'posts_per_page' => '-1',
        'tax_query' => array(
            array(
                'taxonomy' => 'license_type', //double check your taxonomy name in you dd
                'field'    => 'term_id',
                'terms'    => $termId,
            ),
        ),
     );
    $query = new WP_Query( $args );
    $postList = array();
    foreach ( $query->posts as $c ){
        $postList[] = array('title' => $c->post_title, 'id' => $c->ID);
    }
    return $postList;
}

function rest_get_edulevel() {
    global $wpdb;
    global $post;
    $cs_sb_degree_display_setting_tbl    = $wpdb->prefix . 'cs_sb_degree_display_setting';
    $cs_sb_degree_display_setting_result = $wpdb->get_results( "SELECT * FROM $cs_sb_degree_display_setting_tbl ORDER BY display_order", ARRAY_A );
    
    $degrees = array();
    foreach ( $cs_sb_degree_display_setting_result as $degree_single_val ){
        $degrees[] = array('name' => trim( stripslashes( $degree_single_val['degree_name'] ) ), 'value' => trim( stripslashes( $degree_single_val['degree_val'] ) ));
    }
    return $degrees;
}

function rest_get_specializations() {
    global $wpdb;
    global $post;
    $sb_specialization_data_tbl                   = $wpdb->prefix . 'cs_sb_specialization_display_setting'; //subject table name
    $sb_specialization_display_setting_result = $wpdb->get_results( "SELECT * FROM $sb_specialization_data_tbl ORDER BY display_order", ARRAY_A );
    
    $specializations = array();
    foreach ( $sb_specialization_display_setting_result as $specialization_single_val ){
        if ( $specialization_single_val["sb_subject_name"] != 'Divider' ) {
            $specializations[] = array('name' => trim( stripslashes( $specialization_single_val["sb_subject_abbrev"] ) ), 'value' => trim( stripslashes( $specialization_single_val["sb_subject_name"] ) ));
        }
    }
    return $specializations;
}

function get_post_data($attributes){
    if ( isset($attributes['postType']) ) {

        $postId = $attributes['postId'];
        $postType = $attributes['postType'];
        $orderBy = $attributes['postOrderBy'];
    	$order = $attributes['postOrder'];

        if( '' !== $postType ) {
            if( 'cs_faqs' === $postType ){
                $args = array(
                    'post__in' => $postId,
                    'post_type' => $postType,
                    'orderby' => $orderBy,
                    'order' => $order,
                    'post_parent__not_in' => array(0),
                    'posts_per_page' => '-1',
                );
            }else{
                $args = array(
                    'post__in' => $postId,
                    'post_type' => $postType,
                    'orderby' => $orderBy,
                    'order' => $order,
                    'post_parent__not_in' => array(0),
                    'posts_per_page' => '-1',
                    'meta_query' => array(// @codingStandardsIgnoreLine -- for non-VIP environments
                        'title' => array(
                            'key' => 'featured_title',
                        )
                    ),
                );
            }

            $my_query = new WP_Query( $args );
            if($my_query->have_posts() && [] !== $postId) {
                ob_start();
                ?>
				<ul class="<?php echo esc_attr($attributes['className']);?>">
				<?php
				while ($my_query->have_posts()) : $my_query->the_post();
				$featured_title = get_post_meta(get_the_ID(),'featured_title', true);
				if($featured_title !== ''){
                    ?>
                        <li><a href="<?php echo esc_url(get_the_permalink(get_the_ID())); ?>"><?php echo esc_html__($featured_title); ?></a></li>
                    <?php }
                    else { ?>
                        <li><a href="<?php echo esc_url(get_the_permalink(get_the_ID())); ?>"><?php echo esc_html__(get_the_title()); ?></a></li>
                    <?php }
				endwhile; ?>
				</ul>
                <?php
                wp_reset_postdata();
                $output_string = ob_get_contents();
                ob_end_clean();
                return $output_string;
            } else {
                ob_start();?>
                <h2>Please Select Posts</h2>
                <?php $output_string = ob_get_contents();
                ob_end_clean();
                return $output_string;
            }
        } else {
            ob_start();?>
            <h2>Please Select Post Type</h2>
            <?php $output_string = ob_get_contents();
            ob_end_clean();
            return $output_string;
        }
    }
}

function get_latest_posts(){
    ob_start();
    $postType = array( 'cs_blog', 'cs_programs', 'cs_careers' );

    $args = array(
        'posts_per_page' => 3,
        'post_type' => $postType,
        'post_status'    => 'publish',
        'post__not_in' => array(1437, 1438),
        'post_parent__not_in' => array(0)
    );

    $my_query = new wp_query( $args );?>
    <div class="blog-listing-main col-thumbnail">
    <?php
    while ($my_query->have_posts()) : $my_query->the_post();
        $thumb_img_url = get_the_post_thumbnail_url(get_the_ID());
        $contributorId = get_post_meta( get_the_ID(), 'page-contributor-id', true );
        $contributorId = explode( ',', $contributorId );
        $contributeDataArr = array();
        foreach ( $contributorId as $contributeId ) {
            $contributeDataArr[] = $contributeId;
        }
        ?>
        <div class="block-col">
            <div class="block-inner">
                <div class="feature-image" style="background-image: url(<?php echo esc_url($thumb_img_url ? $thumb_img_url : site_url().'/wp-content/uploads/2020/05/post3.png'); ?>)">
                </div>
                <div class="block-content">
                    <div class="blog-details">
                        <div class="date-details">
                            <div class="date-time-area">
                                <img src="<?php echo esc_url(get_template_directory_uri()).'/images/calender.svg' ?>" alt="Calendar Icon">
                                <span class="date"><?php echo get_the_date( 'm/d/y' ); ?></span>
                            </div>
                            <?php
                            if($contributeDataArr[0] !== ""){
                            ?>
                            <div class="author-detail">
                                 By <?php
                                    $contributor = array();
                                    foreach ($contributeDataArr as $contributors) {
                                        array_push($contributor, get_the_title($contributors));
                                    }
                                    echo esc_attr__(implode(', ', $contributor));
                                ?>
                            </div>
                            <?php } ?>
                        </div>
                        <h3><a href="<?php echo esc_url( get_the_permalink( get_the_ID() ) ); ?>"><?php echo esc_html__(get_the_title( get_the_ID() ) ); ?></a></h3>
                        <p><?php echo wp_kses_post(get_the_excerpt()); ?></p>
                    </div>
                </div>
            </div>
        </div>
    <?php endwhile; ?>
    </div>
    <?php
    wp_reset_postdata();
    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

function get_category_posts($attributes){
    $postType = $attributes['postType'];
    $catId = $attributes['catId'];
    $tax = $attributes['postTaxonomy'];
	$args = array(
		'post_type' => $postType,
		'post_parent__not_in' => array(0),
		'posts_per_page' => '99',
		'tax_query' => array(// @codingStandardsIgnoreLine -- for non-VIP environments
			array(
				'taxonomy' => $tax,
				'field'    => 'term_id',
				'terms'    => $catId,
			)
		),
	);

	$my_query = new WP_Query( $args );
	if($my_query->have_posts()) {
		ob_start();
		?>
		<div class="programs-listing">
			<?php
			while ($my_query->have_posts()) : $my_query->the_post();
			$thumbnail_url = get_the_post_thumbnail_url(get_the_ID());
			?>
			<div class="block-col">
                <div class="programs-inner">
                    <div class="programs-image">
                        <img src="<?php echo esc_url($thumbnail_url ? $thumbnail_url : site_url().'/wp-content/uploads/2020/05/post3.png'); ?>" alt="<?php echo esc_html__(get_the_title()); ?>" />
                        <div class="overlayer-info">
                            <div class="overlayer-info-inner">
							<a href="<?php the_permalink(get_the_ID()); ?>">
                                <p><?php echo wp_kses_post(get_excerpt( 280 )); ?></p>
							</a>
                            </div>
                        </div>
                    </div>
                    <div class="information-block">
                        <div class="info-icon">
                            <img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/info.svg" alt="info-image">
                        </div>
                    </div>
                    <div class="programs-title">
                        <h3><a href="<?php esc_url(the_permalink(get_the_ID())); ?>"><?php echo esc_html__(get_the_title()); ?></a></h3>
                    </div>
                </div>
            </div>
			<?php
			endwhile; ?>
		</div>
		<?php
		wp_reset_postdata();
		$output_string = ob_get_contents();
		ob_end_clean();
		return $output_string;
	} else {
		ob_start();?>
		<h2>Please Select Categories</h2>
		<?php $output_string = ob_get_contents();
		ob_end_clean();
		return $output_string;
	}
}

function get_license_post($attributes){
    $postId = $attributes['postId'];
    $postType = 'cs_licenses';
    $postTaxonomy = 'license_type';

    if(isset($attributes['postCategory'])){
        $postCategory = $attributes['postCategory'];
    	$args = array(
    		'post__in'       => array($postId),
    		'post_type' => $postType,
            'post_status' => 'publish',
            'tax_query' => array(
            array (
                'taxonomy' => $postTaxonomy,
                'field' => 'term_id',
                'terms' => $postCategory,
            )
        ),
    	);

    	$my_query = new WP_Query( $args );

            if($my_query->have_posts()) {
                ob_start();

                    while ($my_query->have_posts()) : $my_query->the_post();
                        echo wp_kses_post(get_the_content());
                    endwhile;
                wp_reset_postdata();
                $output_string = ob_get_contents();
                ob_end_clean();
                return $output_string;
            } else {
                ob_start();?>
                <h2>Please Select Post</h2>
                <?php $output_string = ob_get_contents();
                ob_end_clean();
                return $output_string;
            }
	} else {
        ob_start();?>
        <h2>Please Select Category</h2>
        <?php $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    }
}

function get_license_list($attributes){

    if ( getenv( 'HTTP_CLIENT_IP' ) ) {
        $ipaddress = getenv( 'HTTP_CLIENT_IP' );
    } else if ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) {
        $ipaddress = getenv( 'HTTP_X_FORWARDED_FOR' );
    } else if ( getenv( 'HTTP_X_FORWARDED' ) ) {
        $ipaddress = getenv( 'HTTP_X_FORWARDED' );
    } else if ( getenv( 'HTTP_FORWARDED_FOR' ) ) {
        $ipaddress = getenv( 'HTTP_FORWARDED_FOR' );
    } else if ( getenv( 'HTTP_FORWARDED' ) ) {
        $ipaddress = getenv( 'HTTP_FORWARDED' );
    } else if ( getenv( 'REMOTE_ADDR' ) ) {
        $ipaddress = getenv( 'REMOTE_ADDR' );
    } else {
        $ipaddress = 'UNKNOWN';
    }

    if( $ipaddress == '192.168.50.1'){
        $ipaddress = '103.254.244.62';
    }

    $urlTemplate = 'https://ipapi.co/' . $ipaddress . '/json/?key=91380a07aa3391743f49e52e68ea691aebf60e85';
 
    // replace the "%s" with real IP address
    $urlToCall = sprintf( $urlTemplate, $ipaddress);
 
    $rawJson = file_get_contents( $urlToCall );

    $geoLocation = json_decode( $rawJson );
 
    $state = $geoLocation->region;
    
    $postType = 'cs_licenses';
    $postTaxonomy = 'license_type';
    $postCategory = $attributes['postCategory'];
    
    if( 'US' === $geoLocation->country) {
        $args = array(
            'post_type' => $postType,
            'post_status' => 'publish',
            'posts_per_page' => '-1',
            'orderby' => 'title',
            'order' => 'ASC',
            'title' => $state,
            'tax_query' => array(
            array (
                'taxonomy' => $postTaxonomy,
                'field' => 'term_id',
                'terms' => $postCategory,
            )
        ),
        );
    } else {
        $args = array(
            'post_type' => $postType,
            'post_status' => 'publish',
            'posts_per_page' => '-1',
            'orderby' => 'title',
            'order' => 'ASC',
            'title' => 'Alabama',
            'tax_query' => array(
            array (
                'taxonomy' => $postTaxonomy,
                'field' => 'term_id',
                'terms' => $postCategory,
            )
        ),
        );
    }

    if( NULL !== $postCategory ){
    $my_query = new WP_Query( $args );
    $sid = $my_query->posts[0]->ID;
        ob_start();
?>

        <div class="state-select-box dropdown-states state-listing-in-responsive">
            <div class="selected">
            <?php if( 'US' === $geoLocation->country){ 
                while ($my_query->have_posts()) : $my_query->the_post();
                $slug = get_post_field( 'post_name', get_the_ID() );
                ?>
                <span><label class="state-label"><?php echo esc_html(get_the_title()); ?></label></span>
            <?php endwhile;
            } else { ?>
                <span>Select a State</span>
            <?php } ?>
            </div>
            <div class="options-container">
                <div class="state-options" data-category="<?php echo $postCategory; ?>" data-stateid="<?php echo 'all';?>">
                    <label>All States</label>
                </div>
                <?php 
                
                $args = array(
                    'post_type' => $postType,
                    'post_status' => 'publish',
                    'posts_per_page' => '-1',
                    'orderby' => 'title',
                    'order' => 'ASC',
                    'tax_query' => array(
                    array (
                        'taxonomy' => $postTaxonomy,
                        'field' => 'term_id',
                        'terms' => $postCategory,
                    )
                ),
                );
                

                $dropdown_query = new WP_Query( $args );
                //echo "<pre>";print_r($dropdown_query->posts);echo "<pre>";
                    while ($dropdown_query->have_posts()) : $dropdown_query->the_post();
                    $slug = get_post_field( 'post_name', get_the_ID() );
                    
                    $stid = get_the_ID();
                    ?>
                    <div class="state-options" data-category="<?php echo $postCategory; ?>" data-stateid="<?php echo $stid; ?>">
                        <label class="state-label"><?php echo esc_html(get_the_title()); ?></label>
                    </div>
                <?php endwhile;
                ?>

            </div>
            
        </div>

        <figure class="wp-block-table cs-state-details-tbl state-table-list">
            <table class="has-fixed-layout">
            <thead>
            <tr>
                <!-- <th class="has-text-align-center" data-align="center">State<a class="cs-arrow open" category="<?php //echo $postCategory; ?>" sid="<?php //echo $sid; ?>"></a></th> -->
                <th class="has-text-align-center" data-align="center">State</th>
                <th class="has-text-align-center" data-align="center">Licensing Authority</th>
                <th class="has-text-align-center" data-align="center">Eligibility & Details</th>
                <th class="has-text-align-center" data-align="center">Renewal Requirements</th>
            </tr>
            </thead>
            
            <tbody class="getData">
            <?php
                while ($my_query->have_posts()) : $my_query->the_post();
                    $content = get_the_content();
                    $content = preg_replace('#(<h2.*?>).*?(</h2>)#', '$1$2', $content);
                    $content = preg_replace('#(<th.*?>).*?(</th>)#', '$1$2', $content);
                    
                    $allowed_tags = array('td'=>array('class' => array(), 'data-title' => array()),'ul'=>array('class' => array()),'li'=>array(),'strong'=>array(),'br'=>array(),'a'=>array('href'  => array(),
                    'rel'   => array(), 'target' => array()),'i'=>array(),'span'=>array(),'p'=>array());?>

                    <tr><td data-title="State"><?php echo esc_html(get_the_title()); ?></td><?php echo wp_kses($content, $allowed_tags); ?></tr>
                <?php
                endwhile;
            ?>
            </tbody>
            </table>
            </figure>
            <?php
            wp_reset_postdata();
            $output_string = ob_get_contents();
            ob_end_clean();
            return $output_string;
    } else {
        ob_start();?>
        <h2>Please Select Category</h2>
        <?php $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    }
}


function get_category_faqs($attributes){
    $postType = $attributes['postType'];
    $catId = $attributes['catId'];
    $tax = $attributes['postTaxonomy'];
    $orderBy = $attributes['faqOrderBy'];
    $order = $attributes['faqOrder'];
    if($orderBy === 'custom'){
        $args = array(
            'post_type' => $postType,
            'post_parent__not_in' => array(0),
            'posts_per_page' => '99',
            'tax_query' => array(// @codingStandardsIgnoreLine -- for non-VIP environments
                array(
                    'taxonomy' => $tax,
                    'field'    => 'term_id',
                    'terms'    => $catId,
                )
            ),
        );
    } else {
        $args = array(
            'post_type' => $postType,
            'post_parent__not_in' => array(0),
            'posts_per_page' => '99',
            'orderby' => $orderBy,
            'order' => $order,
            'tax_query' => array(// @codingStandardsIgnoreLine -- for non-VIP environments
                array(
                    'taxonomy' => $tax,
                    'field'    => 'term_id',
                    'terms'    => $catId,
                )
            )
        );
    }

    $my_query = new WP_Query( $args );
    if($my_query->have_posts()) {
        ob_start();
        ?>
        <ul>
            <?php
            while ($my_query->have_posts()) : $my_query->the_post();
            ?>
            <li><a href="<?php echo esc_url(get_the_permalink()); ?>"><?php echo esc_html__(get_the_title()); ?></a></li>
            <?php
            endwhile; ?>
        </ul>
        <?php
        wp_reset_postdata();
        $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    } else {
        ob_start();?>
        <h2>Please Select Categories</h2>
        <?php $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    }
}

function get_all_posts($attributes){
    $postType = $attributes['postType'];
    $orderBy = $attributes['postOrderBy'];
    $order = $attributes['postOrder'];
    $ppp = $attributes['postPerPage'];
	if ( get_url_var('paged') ) {
		$paged = get_url_var('paged');
	} else if ( get_url_var('page') ) {
		$paged = get_url_var('page');
	} else {
		$paged = 1;
	}
    if( '' !== $postType ) {
        $args = array(
            'post_type' => $postType,
            'orderby' => $orderBy,
            'order' => $order,
            'post_parent__not_in' => array(0),
            'posts_per_page' => $ppp,
            'post__not_in' => array(1437, 1438),
			'paged' => $paged
        );
        $my_query = new wp_query( $args );
		$big = 999999999; // need an unlikely integer
        $page_title   = get_the_permalink( get_the_ID() );
		$pagination = paginate_links( array(
			'base'    => $page_title . '%_%',
			'format' => '/%#%',
			'current' => max( 1, get_url_var('page') ),
			'total' => $my_query->max_num_pages,
			'prev_text' => '<span>Previous</span>',
			'next_text' => '<span>Next</span>',
			'mid_size' => 1,
		) );
        ob_start();
        if(!empty($pagination)){
        ?>
		<div class="pagination">
		<?php
			echo wp_kses_post($pagination);
		?>
		</div>
		<?php } ?>
        <div class="blog-list">
            <?php
            while ($my_query->have_posts()) : $my_query->the_post();
				$thumb_img_url = get_the_post_thumbnail_url(get_the_ID());
				$contributorId = get_post_meta( get_the_ID(), 'page-contributor-id', true );
				$contributorId = explode( ',', $contributorId );
				$contributeDataArr = array();
				foreach ( $contributorId as $contributeId ) {
					$contributeDataArr[] = $contributeId;
				}
				?>
                <div class="blog-list-item">
					<div class="feature-image" style="background-image: url(<?php echo esc_url($thumb_img_url ? $thumb_img_url : site_url().'/wp-content/uploads/2020/05/post3.png'); ?>)">
                    </div>
					<div class="blog-list-desc">
						<h2><a href="<?php the_permalink(get_the_ID()); ?>"><?php echo get_the_title(); ?></a></h2>
						<div class="date-time-area">
                            <span class="date">
                            <img src="<?php echo esc_url(get_template_directory_uri()).'/images/calender.svg' ?>" alt="Calendar Icon">
                            <span class="blog-date"><?php echo get_the_date( 'm/d/y' );?></span>
                            <?php
                            if($contributeDataArr[0] !== ""){
                            ?>
                            <span class="author-detail"><?php
                                $contributor = array();
                                foreach ($contributeDataArr as $contributors) {
                                    array_push($contributor, get_the_title($contributors));
                                }
                                echo esc_attr__(implode(', ', $contributor));
                                ?>
                            </span>
                            <?php } ?>
                            </span>
						</div>
						<div class="post-content">
						    <p><?php echo wp_kses_post(get_the_excerpt()); ?></p>
						</div>
					</div>
                </div>
            <?php endwhile; ?>
        </div>

        <?php if(!empty($pagination)){ ?>
		<div class="pagination">
		<?php
			echo wp_kses_post($pagination);
		?>
		</div>
		<?php
		}
        wp_reset_postdata();
        $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    } else {
        ob_start();?>
        <h2>Please Select Post Type</h2>
        <?php $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    }
}

function nps_search_box_block($attributes) {
    global $wpdb;
    ob_start();

    $eduLevel = isset($attributes['eduLevel']) ? $attributes['eduLevel'] : '';
    $specialization = isset($attributes['specialization']) ? $attributes['specialization'] : '';
    $fbSpecialization = isset($attributes['fbSpecialization']) ? $attributes['fbSpecialization'] : '';

    $sb_subjects_data_tbl = $wpdb->prefix . 'cs_search_box_subject_data';
    $result = $wpdb->get_results( "SELECT sb_subject_id, sb_subject_name, sb_subject_abbrev FROM $sb_subjects_data_tbl Where sb_subject_abbrev = '$specialization' ");
    $specialization = (isset($result) && !empty($result)) ? $specialization : $fbSpecialization;

    echo do_shortcode("[nps_search_box edulevel='".$eduLevel."' specialization='".$specialization."' fbspecialization='".$fbSpecialization."']");

    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

function contributors_block_section() {
    ob_start();
    global $post;

    $contributorId = get_post_meta( $post->ID, 'page-contributor-id', true );
    $contributorId = explode( ',', $contributorId );
    $contributeDataArr = array();
    foreach ( $contributorId as $contributeId ) {
        $contributeDataArr[] = $contributeId;
    }

    if( !empty( $contributeDataArr ) ) { ?>
        <div class="our-team-section">
    		<?php
                foreach ( $contributeDataArr as $contributor ) { ?>
                    <?php $posts = get_post( $contributor );
                    if ( ! empty( $contributor ) ) { ?>
                        <div class="team-member">
                            <div class="m-thumbnail">
                                <?php
                                $blogFeaturedImage_url = wp_get_attachment_url( get_post_thumbnail_id( $contributor ) );

                                if ( ! empty( $blogFeaturedImage_url ) ) { ?>
                                    <img width="132" height="139" class="post-featured-img"
                                         src="<?php echo esc_url($blogFeaturedImage_url); ?>"
                                         alt="<?php echo esc_html__($posts->post_title); ?>" loading="lazy" />
                                <?php } else { ?>
                                    <img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/author.jpg"
                                         alt="<?php echo esc_html__($posts->post_title); ?>" loading="lazy" /><?php
                                } ?>

                            </div>
                            <div class="m-details">
                                <?php $categories = wp_get_post_terms( $contributor, 'contributor_type' ); ?>
                                <p class="m-name"><?php echo esc_html__(ucfirst( $posts->post_title )); ?></p>
                                <span class="m-position">
                                <?php foreach ( $categories as $category ) {
									$categories_title = $category->name;
								}
								echo esc_html__($categories_title); ?>
								</span><br>
                                <?php echo wp_kses_post($posts->post_content); ?>
                            </div>
                        </div>
                        <?php
                    } wp_reset_postdata();
                } ?>

        </div>
        <?php
    }

    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

function contributors_list_section() {
    ob_start();
	?>
	<div class="about-us-section">
		<?php
			$ids = array( "137", "144", "119" );
			foreach ( $ids as $ids_details ) {
				$posts = get_post( $ids_details );
					if( isset( $posts ) && !empty( $posts ) ) {
							?>
							<div class="team-member">
								<div class="m-thumbnail">
									<?php
									$blogFeaturedImage_url = wp_get_attachment_url( get_post_thumbnail_id( $posts->ID ) );

									if ( ! empty( $blogFeaturedImage_url ) ) { ?>
										<img width="132" height="139" class="post-featured-img"
										     src="<?php echo esc_url($blogFeaturedImage_url); ?>"
										     alt="<?php echo esc_html__($posts->post_title); ?>"/>
									<?php } else { ?>
										<img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/author.jpg"
										     alt="<?php echo esc_html__($posts->post_title); ?>" /><?php
									} ?>

								</div>
								<div class="m-details">
									<?php $categories = wp_get_post_terms( $posts->ID, 'contributor_type' ); ?>
									<p class="m-name"><?php echo esc_html__(ucfirst( $posts->post_title )); ?></p>
									<span class="m-position"> <?php $cat_array = array();
									foreach ( $categories as $category ) {
											$categories_title = ucfirst( $category->name );

											array_push($cat_array, $categories_title);
										}
										echo esc_attr__(implode(', ', $cat_array)); ?></span>
									<?php echo wp_kses_post($posts->post_content); ?>
								</div>
							</div>
							<?php
					}

			}

			$args_nps_contributor_details = new WP_Query( array(
				'post_type'      => 'cs_contributor',
				'post_status'    => 'publish',
				'posts_per_page' => - 1,
				'orderby'        => 'title',
				'order'          => 'ASC',
				'fields'         => 'ids',
			) );

			if( isset( $args_nps_contributor_details->posts ) && !empty( $args_nps_contributor_details->posts ) ) {
				foreach ( $args_nps_contributor_details->posts as $args_nps_contributor_details_data ) {
				    if ( in_array( $args_nps_contributor_details_data, $ids ) ){ // @codingStandardsIgnoreLine -- for non-VIP environments
                        continue;
                    }
					?>
					<div class="team-member">
						<div class="m-thumbnail">
							<?php
							$blogFeaturedImage_url = wp_get_attachment_url( get_post_thumbnail_id( $args_nps_contributor_details_data ) );

							if ( ! empty( $blogFeaturedImage_url ) ) { ?>
								<img width="132" height="139" class="post-featured-img"
								     src="<?php echo esc_url($blogFeaturedImage_url); ?>"
								     alt="<?php echo esc_html__(get_the_title( $args_nps_contributor_details_data )); ?>"/>
							<?php } else { ?>
								<img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/author.jpg"
								     alt="<?php echo esc_html__(get_the_title( $args_nps_contributor_details_data )); ?>" /><?php
							} ?>

						</div>
						<div class="m-details">
							<?php $categories = wp_get_post_terms( $args_nps_contributor_details_data, 'contributor_type' ); ?>
							<p class="m-name"><?php echo get_the_title( $args_nps_contributor_details_data ); ?></p>
							<span class="m-position"> <?php $cat_array = array();
									foreach ( $categories as $category ) {
											$categories_title = ucfirst( $category->name );

											array_push($cat_array, $categories_title);
										}
										echo esc_attr__(implode(', ', $cat_array));
								 ?></span>
							<?php echo wp_kses_post(get_post_field('post_content', $args_nps_contributor_details_data)); ?>
						</div>
					</div>
					<?php
				}
			}

			?>
	</div>
	<?php

	$output_string = ob_get_contents();
	ob_end_clean();
	return $output_string;
}

function experts_list_section() {
    ob_start();
    ?>
    <div class="about-us-section">
        <?php
            
            $args_cs_expert_details = new WP_Query( array(
                'post_type'      => 'cs_experts',
                'post_status'    => 'publish',
                'posts_per_page' => - 1,
                'orderby'        => 'title',
                'order'          => 'ASC',
            ) );

            if( isset( $args_cs_expert_details->posts ) && !empty( $args_cs_expert_details->posts ) ) {
                foreach ( $args_cs_expert_details->posts as $args_cs_expert_details_data ) {
                    ?>
                    <div class="team-member">
                        <div class="m-thumbnail">
                            <?php
                            $blogFeaturedImage_url = wp_get_attachment_url( get_post_thumbnail_id( $args_cs_expert_details_data ) );

                            if ( ! empty( $blogFeaturedImage_url ) ) { ?>
                                <img width="132" height="139" class="post-featured-img"
                                     src="<?php echo esc_url($blogFeaturedImage_url); ?>"
                                     alt="<?php echo esc_html__(get_the_title( $args_cs_expert_details_data )); ?>"/>
                            <?php } else { ?>
                                <img src="<?php echo esc_url(get_template_directory_uri()); ?>/images/author.jpg"
                                     alt="<?php echo esc_html__(get_the_title( $args_cs_expert_details_data )); ?>" /><?php
                            } 
                            ?>

                        </div>
                        <div class="m-details">
                            <p class="m-name"><a href="<?php echo get_post_meta( $args_cs_expert_details_data->ID, 'expert_url', true); ?>"><?php echo get_the_title( $args_cs_expert_details_data ); ?></a></p>
                            <?php echo wp_kses_post(get_post_field('post_content', $args_cs_expert_details_data)); ?>
                        </div>
                    </div>
                    <?php
                }
            }

            ?>
    </div>
    <?php

    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

function latest_schools_list($attributes){
	ob_start();
	?>
	<div class="latest-addittion-sct">
	<?php
	$args = array(
		'post_type'      => $attributes['postType'],
		'post_status'    => 'publish',
		'posts_per_page' => 4,
		'orderby'        => 'date',
		'order'          => 'DESC',
		'post_parent__not_in' => array(0)
	);

	$school_profile_posts = new WP_Query($args);

	while ($school_profile_posts->have_posts()) : $school_profile_posts->the_post();
		$uni_img_url = get_the_post_thumbnail_url(get_the_ID());
		?>

		<div class="schoolprofile-col schoolprofile-img-blk">
			<div class="img-container">
				<img src="<?php echo esc_url(plugin_dir_url(__FILE__)); ?>images/university_bg-profiles.jpg" class="schoolprofile-image"/>
				<div class="transperent-logo">
					<div class="transparent-logo-bg">
						<?php
						if( isset( $uni_img_url ) && !empty( $uni_img_url ) ) { ?>
							<img src="<?php echo esc_url($uni_img_url); ?>">
						<?php } ?>
					</div>
				</div>
			</div>
			<div class="schoolprofile-overlay">
				<div class="schoolprofile-text">
					<p><?php echo esc_html__(get_the_excerpt()); ?></p>
					<a href="<?php echo esc_url(get_post_permalink()); ?>"><button class="view-more">View Full Profile</button></a>
				</div>
			</div>
			<div class="bottom-cnt"><span><?php echo esc_html__(get_the_title(get_the_ID())); ?></span></div>
		</div>
	<?php
	endwhile;
	$output_string = ob_get_contents();
	ob_end_clean();
	return $output_string;
}

function get_progress_bar(){
    ob_start();
	?>
	<div class="cs-progress-bar"><progress class="bar" value="0" max="100"></progress></div>
	<?php
	$output_string = ob_get_contents();
	ob_end_clean();
	return $output_string;
}

function related_post_section($attributes){
	ob_start();
	global $post;
	?>
		<section class="related-ranking-and-post-section">
			
					<?php
						display_related_blogs($attributes);
						
						display_related_careers($attributes);
					
						display_related_programs($attributes);
					?>
				
		</section>
	<?php
	$output_string = ob_get_contents();
	ob_end_clean();
	return $output_string;
}

/**
 * Add function for display Related Careers.
 *
 * @date  01-02-2018
 * @since MHA Online Theme
 */
function display_related_careers($attributes) {
	global $post;
	$display_related_careers = $attributes['displayRelCareers'];
	if ( $display_related_careers === true ) {
		$excludeSelf      = $attributes['excludeSelfCareers'];
		$showBoth         = $attributes['pullCareersBy'];
		$displayLimit     = $attributes['displayLinksCareers'];
		$exId             = array( get_the_ID() );
		$excId            = array();
		$result           = ( $excludeSelf === true ) ? $exId : $excId;
		$tags_sec         = get_post_meta( $post->ID, 'careertags_sec', true );
		$tags_sec         = explode( ",", $tags_sec );
		$tag_title = $attributes['careersTitle'];
		?>
		<div class="related-careers top-gradient-border">
			<div class="related-careers-inner">
			<?php
			if ( ! empty( $tag_title ) ) {
				?><h3 class="section-title"><?php echo esc_html__($tag_title); ?></h3><?php
			} else {
				?><h3 class="section-title">Related Careers</h3><?php
			}
			?>
			<ul class="related-careers-inner-list">
			<?php
			if ( $showBoth === 'primary' ) {
				$primarypostunique = array();
				for ($j = 0; $j <= array_key_last($tags_sec); $j++) {
					$posts1 = new WP_Query(array('post_type' => $attributes['postTypeCareers'], 'posts_per_page' => -1));
					foreach ($posts1->posts as $post1) {
						if ( in_array( $post1->ID, $result, true ) ){
							continue;
						}
						$interviewtagid = get_post_meta($post1->ID, 'tags-primary', true);
						if ($tags_sec[$j] === $interviewtagid && $interviewtagid !== '') { ?>
							<?php
							$primarypostunique[] = $post1->ID;
							?>
						<?php }
					}
				}
				$argsrelatedcareer     = array(
					'post_type'      => $attributes['postTypeCareers'],
					'posts_per_page' => ($displayLimit != 'all') ? $displayLimit : '-1',
					'post_status'    => 'publish',
					'orderby'        => 'title',
					'order'          => 'ASC',
					'post__in'       => $primarypostunique,
				);
				$loopargsrelatedcareer = new WP_Query( $argsrelatedcareer );
				if ( ! empty( $primarypostunique ) ) {
					$count = 1;
					foreach ($loopargsrelatedcareer->posts as $relatedcareer) {
						if ( in_array( $relatedcareer->ID, $result, true ) ){
							continue;
						}
						?>
						<li>
						<span class="rank"><?php echo esc_html($count); ?></span><span class="details-span"><a href="<?php echo esc_url(get_permalink($relatedcareer->ID)); ?>"><?php echo esc_html__($relatedcareer->post_title); ?></a></span>
						</li>
						<?php
						$count ++;
					}
					wp_reset_query();
				} else { ?>
				<li>There are no related careers. </li>
				<?php
			    }
			} else {
				$postunique = array();
				$test_array = array();
				if($tags_sec[0] !== ''){
					for ( $j = 0; $j <= array_key_last( $tags_sec ); $j ++ ) {
						$posts1 = new WP_Query(
							array(
								'post_type' => array( $attributes['postTypeCareers'] ),
								'posts_per_page' => -1,
							));

						foreach ( $posts1->posts as $post1 ) {

							if ( in_array( $post1->ID, $result, true ) ){
								continue;
							}
							$interviewtagid = get_post_meta( $post1->ID, 'tags-primary', true );
							$interviewtagid = explode( ',', $interviewtagid );
							$tagsecrows     = get_post_meta( $post1->ID, 'tags-secondary', true );
							$tagsecrows     = explode( ',', $tagsecrows );

							$tag_joint      = array_merge( $interviewtagid, $tagsecrows );
							$tag_joint      = array_values(array_unique( $tag_joint ));

							for ( $i = 0; $i <= array_key_last( $tag_joint ); $i ++ ) {
								if ( $tags_sec[ $j ] === $tag_joint[ $i ] && $tag_joint[ $i ] !== NULL ) { ?>
									<?php
									$test_array[$post1->ID] = $tag_joint;
									$postunique[] = $post1->ID . "....";
									?>
								<?php }
							}
						}
					}
					foreach ( $test_array as $key => $test_array_data ) {
						foreach ( $test_array_data as $k => $v ) {
							if( ! in_array( $v, $tags_sec, true ) ) {
								unset($test_array[$key][$k]);
							}
						}
					}

					uasort($test_array,"sort_array_descending");
					$main_array = array();
					$return = array();
					$main_array_final = array();
					$all_keys = array();

					foreach ( $test_array as $key => $value ) {
						$main_array[ $key ] = sizeof( $value );
					}

					foreach ($main_array as $key => $value) {
						$return[$value][] = $key;
						$all_keys[] = $value;
					}
					foreach ( $return as $key => $value ) {
						foreach ( $value as $k => $v ) {
							$main_array_final[$key][get_the_title( $v )] = $v;
						}
					}

					$all_keys = array_unique( $all_keys );

					foreach ( $all_keys as $all_keys_value ) {
						ksort( $main_array_final[$all_keys_value] );
					}

					$limit = 1;
					$count = 1;
					if( isset( $main_array_final ) && !empty( $main_array_final ) ) {
						foreach ( $main_array_final as $k => $v ) {
							foreach ( $v as $key => $value ) {
								if( $limit <= $displayLimit ) {
									?>
									<li>
									<span class="rank"><?php echo esc_html($count); ?></span><span class="details-span"><a href="<?php echo esc_url(get_the_permalink( $value )); ?>"><?php echo esc_html__(get_the_title( $value )); ?></a></span>
										<input type="hidden" name="count" value="<?php echo esc_attr__($k); ?>">
									</li>
									<?php
								}
								$limit++;
								$count++;
							}
						}
						wp_reset_query();
					}
				} else { ?>
					<li>There are no related careers.</li>
				<?php }
			}?>
			</ul>
			</div>
			</div>
		<?php
	}
}

/**
 * Add function for display Related Programs.
 *
 * @date  01-02-2018
 * @since MHA Online Theme
 */
function display_related_programs($attributes) {
	global $post;
	$display_related_programs = $attributes['displayRelPrograms'];
	if ( $display_related_programs === true ) {
		$excludeSelf      = $attributes['excludeSelfPost'];
		$showBoth         = $attributes['pullPostsBy'];
		$displayLimit     = $attributes['displayLinks'];
		$exId             = array( get_the_ID() );
		$excId            = array();
		$result           = ( $excludeSelf === true ) ? $exId : $excId;
		$tags_sec         = get_post_meta( $post->ID, 'tags_sec', true );
		$tags_sec         = explode( ",", $tags_sec );
		$tag_title = $attributes['programsTitle'];?>
		<div class="related-ranking top-gradient-border">
			<div class="related-ranking-inner">
		<?php
			if ( ! empty( $tag_title ) ) {
				?><h3 class="section-title"><?php echo esc_html__($tag_title); ?></h3><?php
			} else {
				?><h3 class="section-title">Related Programs</h3><?php
			}
			?>
			<ul class="related-ranking-inner-list">
			<?php
			if ( $showBoth === 'primary' ) {
				$primarypostunique = array();
				for ($j = 0; $j <= array_key_last($tags_sec); $j++) {
					$posts1 = new WP_Query(array('post_type' => $attributes['postType'], 'posts_per_page' => -1));
					foreach ($posts1->posts as $post1) {
						if ( in_array( $post1->ID, $result, true ) ){
							continue;
						}
						$interviewtagid = get_post_meta($post1->ID, 'tags-primary', true);
						if ($tags_sec[$j] === $interviewtagid && $interviewtagid !== '') { ?>
							<?php
							$primarypostunique[] = $post1->ID;
							?>
						<?php }
					}
				}
				
				$argsrelatedprogram     = array(
					'post_type'      => $attributes['postType'],
					'posts_per_page' => ($displayLimit != 'all') ? $displayLimit : '-1',
					'post_status'    => 'publish',
					'orderby'        => 'title',
					'order'          => 'ASC',
					'post__in'       => $primarypostunique,
				);
				$loopargsrelatedprogram = new WP_Query( $argsrelatedprogram );
				if ( ! empty( $primarypostunique ) ) {
					$count = 1;
					foreach ($loopargsrelatedprogram->posts as $relatedprogram) {
						if ( in_array( $relatedprogram->ID, $result, true ) ){
							continue;
						}
						?>
				<li><span class="rank"><?php echo esc_html($count); ?></span><span class="details-span"><a href="<?php echo esc_url(get_the_permalink($relatedprogram->ID)); ?>"><?php echo esc_html__(get_the_title( $relatedprogram->ID )); ?></a></span></li>
						<?php
						$count ++;
					}
					wp_reset_query();
				} else { ?>
				<p>There are no related programs. </p>
            <?php
			    }
			} else {
				$postunique = array();
				$test_array = array();
				if($tags_sec[0] !== ''){
					for ( $j = 0; $j <= array_key_last( $tags_sec ); $j ++ ) {
						$posts1 = new WP_Query(
							array(
								'post_type' => array( $attributes['postType'] ),
								'posts_per_page' => -1,
							));

						foreach ( $posts1->posts as $post1 ) {

							if ( in_array( $post1->ID, $result, true ) ){
								continue;
							}
							$interviewtagid = get_post_meta( $post1->ID, 'tags-primary', true );
							$interviewtagid = explode( ',', $interviewtagid );
							$tagsecrows     = get_post_meta( $post1->ID, 'tags-secondary', true );
							$tagsecrows     = explode( ',', $tagsecrows );
							
							$tag_joint      = array_merge( $interviewtagid, $tagsecrows );
							$tag_joint      = array_values(array_unique( $tag_joint ));
							
							for ( $i = 0; $i <= array_key_last( $tag_joint ); $i ++ ) {
								if ( $tags_sec[ $j ] === $tag_joint[ $i ] && $tag_joint[ $i ] !== NULL ) { ?>
									<?php
									$test_array[$post1->ID] = $tag_joint;
									$postunique[] = $post1->ID . "....";
									?>
								<?php }
							}
						}
					}
					
					foreach ( $test_array as $key => $test_array_data ) {
						foreach ( $test_array_data as $k => $v ) {
							if( ! in_array( $v, $tags_sec, true ) ) {
								unset($test_array[$key][$k]);
							}
						}
					}
					

					uasort($test_array,"sort_array_descending");
					$main_array = array();
					$return = array();
					$main_array_final = array();
					$all_keys = array();

					foreach ( $test_array as $key => $value ) {
						$main_array[ $key ] = sizeof( $value );
					}
					
					foreach ($main_array as $key => $value) {
						$return[$value][] = $key;
						$all_keys[] = $value;
					}
					foreach ( $return as $key => $value ) {
						foreach ( $value as $k => $v ) {
							$main_array_final[$key][get_the_title( $v )] = $v;
						}
					}

					$all_keys = array_unique( $all_keys );

					foreach ( $all_keys as $all_keys_value ) {
						ksort( $main_array_final[$all_keys_value] );
					}

					$limit = 1;
					$count = 1;
					if( isset( $main_array_final ) && !empty( $main_array_final ) ) {
						foreach ( $main_array_final as $k => $v ) {
							foreach ( $v as $key => $value ) {
								if( $limit <= $displayLimit ) {
									?>
									<li><span class="rank"><?php echo esc_html($count); ?></span><span class="details-span"><a href="<?php echo esc_url(get_the_permalink($value)); ?>"><?php echo esc_html__(get_the_title( $value )); ?></a></span>
									<input type="hidden" name="count" value="<?php echo esc_attr__($k); ?>">
									</li>

									<?php
								}
								$limit++;
								$count++;
							}
						}
						wp_reset_query();
					} else { ?>
						<li>There are no related programs.</li>
				<?php }
				} else { ?>
					<li>There are no related programs.</li>
				<?php }
			}?>
			</ul>
			</div>
			</div>
		<?php
	}
}

function sort_array_descending($a, $b) {
  if ($a === $b) {
        return 0;
    }
   return ($a > $b) ? -1 : 1;
}

/**
 * Add function for display Related Posts.
 *
 * @date  01-02-2018
 * @since MHA Online Theme
 */
function display_related_blogs($attributes) {
	global $post;
	$display_related_blogs = $attributes['displayRelBlogs'];
	if ( $display_related_blogs === true ) {
		/* Tagging functionality */
		$excludeself_tags = $attributes['excludeSelfBlog'];
		$tagboth          = $attributes['pullBlogsBy'];
		$displayBloglimit = $attributes['displayLinksBlog'];
		$b                = array( get_the_ID() );
		$a                = array();
		$result           = ( $excludeself_tags === true ) ? $b : $a;
		$tags_sec         = get_post_meta( $post->ID, 'relatedfeatures_sec', true );
		$tags_sec         = explode( ',', $tags_sec );
		$tag_title = $attributes['blogsTitle'];
		?>
		<div class="related-post top-gradient-border">
			<div class="related-post-inner">
			<?php
			if ( ! empty( $tag_title ) ) {
				?><h3 class="section-title"><?php echo esc_html__($tag_title); ?></h3><?php
			} else {
				?><h3 class="section-title">Related Articles</h3><?php
			}
			?>
			<ul class="related-post-inner-list">
		<?php
		if ( $tagboth === 'primary' ) {
			$primarypostunique = array();
			for ( $j = 0; $j <= array_key_last( $tags_sec ); $j ++ ) {
				$posts1 = new WP_Query( array( 'post_type' => $attributes['postTypeBlog'], 'posts_per_page' => - 1 ) );
				foreach ( $posts1->posts as $post1 ) {
					if ( in_array( $post1->ID, $result, true ) ){
						continue;
					}
					$interviewtagid = get_post_meta( $post1->ID, 'tags-primary', true );
					if ( $tags_sec[ $j ] === $interviewtagid && $interviewtagid !== '' ) { ?>
						<?php
						$primarypostunique[] = $post1->ID;
						?>
					<?php }
				}
			}

			$argsrelatedblog     = array(
				'post_type'      => $attributes['postTypeBlog'],
				'posts_per_page' => ($displayBloglimit != 'all') ? $displayBloglimit : '-1',
				'post_status'    => 'publish',
				'orderby'        => 'title',
				'order'          => 'ASC',
				'post__in'       => $primarypostunique,
			);
			$loopargsrelatedblog = new WP_Query( $argsrelatedblog );


			if ( ! empty( $primarypostunique ) ) {
				foreach ( $loopargsrelatedblog->posts as $relatedblog ) {
					if ( in_array( $relatedblog->ID, $result, true ) ){
						continue;
					}

					$date          = get_the_date( 'm/d/y', $relatedblog->ID );
					$contributorId = get_post_meta( $relatedblog->ID, 'page-contributor-id', true );
					$contributorId = explode( ',', $contributorId );
					$contributeDataArr = array();
					foreach ( $contributorId as $contributeId ) {
						$contributeDataArr[] = $contributeId;
					}
					?>
					<li>
						<a href="<?php echo esc_url(get_the_permalink($relatedblog->ID)); ?>"><?php echo esc_html__($relatedblog->post_title); ?></a>
						<span class="date"><?php echo esc_html($date);
							$contributor = array();
							foreach ($contributeDataArr as $contributors) {
								array_push($contributor, get_the_title($contributors));
							}?>
                            <span class="author">
                            <?php
							    echo esc_attr__(implode(', ', $contributor));
							?>
                            </span>
						</span>
					</li>
                        
				<?php
				}
				wp_reset_query();
			} else { ?>
				<li>There are no related articles. </li>
        <?php
			}
		} else {
			$postunique = array();
			$test_array = array();
			if($tags_sec[0] !== ''){
				for ( $j = 0; $j <= array_key_last( $tags_sec ); $j ++ ) {
					$posts1 = new WP_Query(
					array(
						'post_type' => $attributes['postTypeBlog'],
						'posts_per_page' => -1,
					));

					foreach ( $posts1->posts as $post1 ) {
						if ( in_array( $post1->ID, $result, true ) ){
							continue;
						}
						$interviewtagid = get_post_meta( $post1->ID, 'tags-primary', true );
						$interviewtagid = explode( ',', $interviewtagid );
						$tagsecrows     = get_post_meta( $post1->ID, 'tags-secondary', true );
						$tagsecrows     = explode( ',', $tagsecrows );

						$tag_joint      = array_merge( $interviewtagid, $tagsecrows );
						$tag_joint      = array_values(array_unique( $tag_joint ));
						for ( $i = 0; $i <= array_key_last( $tag_joint ); $i ++ ) {
							if ( $tags_sec[ $j ] === $tag_joint[ $i ] && $tag_joint[ $i ] !== NULL ) { ?>
								<?php
								$test_array[$post1->ID] = $tag_joint;
								$postunique[] = $post1->ID . "....";
								?>
							<?php }
						}
					}
				}

				foreach ( $test_array as $key => $test_array_data ) {
					foreach ( $test_array_data as $k => $v ) {
						if( ! in_array( $v, $tags_sec, true ) ) {
							unset($test_array[$key][$k]);
						}
					}
				}

				uasort($test_array,"sort_array_descending");
				$main_array = array();
				$return = array();
				$main_array_final = array();
				$all_keys = array();
				foreach ( $test_array as $key => $value ) {
					$main_array[ $key ] = sizeof( $value );
				}
				foreach ($main_array as $key => $value) {
					$return[$value][] = $key;
					$all_keys[] = $value;
				}

				foreach ( $return as $key => $value ) {
					foreach ( $value as $k => $v ) {
						$main_array_final[$key][get_the_time('Y-m-d G:i:s', $v)] = $v;
					}
				}

				$all_keys = array_unique( $all_keys );

				foreach ( $all_keys as $all_keys_value ) {
					krsort( $main_array_final[$all_keys_value] );
				}

				$limit = 1;
				$count = 1;

				if( isset( $main_array_final ) && !empty( $main_array_final ) ) {
					foreach ( $main_array_final as $k => $v ) {
						foreach ( $v as $key => $value ) {
							if( $limit <= $displayBloglimit ) {
								$date          = get_the_date( 'm/d/y', $value );
								$contributorId = get_post_meta( $value, 'page-contributor-id', true );
								$contributorId = explode( ',', $contributorId );
								$contributeDataArr = array();
								foreach ( $contributorId as $contributeId ) {
									$contributeDataArr[] = $contributeId;
								}
								?>
								<li>
									<a href="<?php echo esc_url(get_the_permalink($value)); ?>"><?php echo esc_html__(get_the_title( $value )); ?></a>
										<span class="date"><?php echo esc_html($date);
										$contributor = array();
										foreach ($contributeDataArr as $contributors) {
											array_push($contributor, get_the_title($contributors));
										} ?>
											<span class="author">
											<?php
											echo esc_attr__(implode(', ', $contributor));
											?>
											</span>                           
										</span>
										<input type="hidden" name="matched" value="<?php echo esc_attr__($k); ?>">
								</li>

							<?php
							}
							$limit++;
							$count++;
						}
					}
				}
			} else { ?>
				<li>There are no related articles.</li>
				<?php
			}
		} ?>
		</ul>
		</div>
		</div>
	<?php
	}
}

function get_nearby_states($attributes){
	global $post;
    $termsArr = get_the_terms($post->ID, 'state_region');
    
	foreach($termsArr as $term) { $cat = $term->term_id; }
    if(isset($cat)){
    	$args = array(
    	'post_type' => 'cs_states',
    	'post__not_in' => array( get_the_ID() ),
    	'posts_per_page' => '-1',
    	'orderby'        => 'title',
    	'order'          => 'ASC',
    	'tax_query' => array(
    		array(
    			'taxonomy' => 'state_region',
    			'field'    => 'term_id',
    			'terms'    => $cat,
    			),
    		),
    	);
    	
    	$my_query = new WP_Query( $args );
    	if($my_query->have_posts()) {
    		ob_start();
    		?>
    		<ul class="near-by-state-list">
    		<?php
    		
    		while ($my_query->have_posts()) : $my_query->the_post();
    		$featured_title = get_post_meta(get_the_ID(), 'featured_title');
    		?>
    			<li><a href="<?php echo esc_url(get_the_permalink(get_the_ID())); ?>"><?php echo esc_html__($featured_title ? $featured_title : get_the_title()); ?></a></li>
    		<?php
    		endwhile; ?>
    		</ul>
    		<?php
    		wp_reset_postdata();
    		$output_string = ob_get_contents();
    		ob_end_clean();
    		return $output_string;
    	} else {
    		ob_start();?>
    		<h3 style="text-align:center">Please Select State Region</h3>
    		<?php $output_string = ob_get_contents();
    		ob_end_clean();
    		return $output_string;
    	}
    }
}

function get_category_blogs($attributes){
    $postType = $attributes['postType'];
    $catId = $attributes['catId'];
	$tax = $attributes['postTaxonomy'];
	$ppp = $attributes['postPerPage'];
	if ( get_query_var('paged') ) {
		$paged = get_query_var('paged');
	} else if ( get_query_var('page') ) {
		$paged = get_query_var('page');
	} else {
		$paged = 1;
	}
    if( '' !== $postType ) {
	$args = array(
		'post_type' => $postType,
		'post_parent__not_in' => array(0),
		'posts_per_page' => $ppp,
		'paged' => $paged,
		'tax_query' => array(// @codingStandardsIgnoreLine -- for non-VIP environments
			array(
				'taxonomy' => $tax,
				'field'    => 'term_id',
				'terms'    => $catId,
			)
		),
	);

	$my_query = new WP_Query( $args );
	$big = 999999999; // need an unlikely integer
	$url_params_regex = '/\?.*?$/';
  	preg_match($url_params_regex, get_pagenum_link(), $url_params);

  	$page_title   = get_the_permalink( get_the_ID() );
  	$format = 'page/%#%';
		$pagination = paginate_links( array(
			'base' => $page_title . '%_%',
			'format' => '/%#%',
			'current' => max( 1, get_query_var('page') ),
			'total' => $my_query->max_num_pages,
			'prev_text' => '<span>Previous</span>',
			'next_text' => '<span>Next</span>',
			'mid_size' => 1,
		) );
        ob_start();
        if(!empty($pagination)){ ?>
            <div class="pagination">
            <?php
                echo wp_kses_post($pagination);
            ?>
            </div>
		<?php } ?>
        <div class="blog-list">
            <?php
            while ($my_query->have_posts()) : $my_query->the_post();
				$thumb_img_url = get_the_post_thumbnail_url(get_the_ID());
				$contributorId = get_post_meta( get_the_ID(), 'page-contributor-id', true );
				$contributorId = explode( ',', $contributorId );
				$contributeDataArr = array();
				foreach ( $contributorId as $contributeId ) {
					$contributeDataArr[] = $contributeId;
				}
				?>
                <div class="blog-list-item">
					<div class="feature-image" style="background-image: url(<?php echo esc_url($thumb_img_url ? $thumb_img_url : site_url().'/wp-content/uploads/2020/05/post3.png'); ?>)">
                    </div>
					<div class="blog-list-desc">
						<h2><a href="<?php the_permalink(get_the_ID()); ?>"><?php echo get_the_title(); ?></a></h2>
						<div class="date-time-area">
                            <span class="date">
                            <img src="<?php echo esc_url(get_template_directory_uri()).'/images/calender.svg' ?>" alt="Calendar Icon">
                            <span class="blog-date"><?php echo get_the_date( 'm/d/y' );?></span>
                            <?php
                            if($contributeDataArr[0] !== ""){
                            ?>
                            <span class="author-detail"><?php
                                $contributor = array();
                                foreach ($contributeDataArr as $contributors) {
                                    array_push($contributor, get_the_title($contributors));
                                }
                                echo esc_attr__(implode(', ', $contributor));
                                ?>
                            </span>
                            <?php } ?>
                            </span>
						</div>
						<div class="post-content">
						    <p><?php echo wp_kses_post(get_the_excerpt()); ?></p>
						</div>
					</div>
                </div>
            <?php endwhile; ?>
        </div>

        <?php if(!empty($pagination)){ ?>
            <div class="pagination">
            <?php
                echo wp_kses_post($pagination);
            ?>
            </div>
		<?php
		}
        wp_reset_postdata();
        $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    } else {
        ob_start();?>
        <h2>Please Select Post Type</h2>
        <?php $output_string = ob_get_contents();
        ob_end_clean();
        return $output_string;
    }
}

function display_page_banner_details() {
    ob_start();
    global $post;
    $cur_page_id = $post->ID;
    $html = "";
    $pType = get_post_type( $cur_page_id );

    $postTypeSlug = '';

    $postTypeSlug = 'page-contributor-id';

    $html .= "
            <div class='banner-thumbnail-main'>
                <div class='banner-thumbnail'>
                    <div class='banner-thumbnail-col'>";

                    $contributorId = get_post_meta($cur_page_id, $postTypeSlug, true);
                    $reviewerId = get_post_meta($cur_page_id,'page-reviewed-contributor-id',true);
                    // $updated_date = get_post_meta($cur_page_id,'page-last-updated-date',true); 
                    $updated_date = get_the_date('F j, Y');
                    // if( empty( $updated_date ) ){
                    //     $u_time          = get_the_time( 'U' );
                    //     $u_modified_time = get_the_modified_time( 'U' );
                    //     if ( $u_modified_time >= $u_time + 86400 ) {
                    //         $updated_date = get_the_modified_time( 'F j, Y' );
                    //     }   
                    // }
                    
                    $contributeIds = explode(',',$contributorId);
                    $contributeDataArr = array();
                    
                    if(! empty( $contributeIds ) ){
                        foreach ($contributeIds as $contributeId) {
                            $idStauts = get_post_status( $contributeId );
                            if ($idStauts == 'publish') {
                                $contributeDataArr[] = $contributeId;
                            }
                        }
                    }
                    
                    $contributo_html = '';
                    if (!empty($contributorId)) { 
                        foreach ($contributeDataArr as $contributor) {
                            $postss = get_post($contributor);
                            if (!empty($contributor)) { 
                                $contrubutor_title = str_replace( ",","", str_replace( " ","-", strtolower( $postss->post_title ) )) ;
                                $contributor_id = $postss->ID;
                                $anchor_link = site_url()."/about-us?contributor_id=$contrubutor_title";
                                $contributo_html .= "<a data-id = '$contributor_id' href='javascript:void(0);'>$postss->post_title</a>, ";
                            }
                        }   
                    }
                    if( !empty( $contributo_html ) ){
                        $contributo_html = rtrim($contributo_html, ", ");
                        $contributo_html = "<span class='author-name'>By $contributo_html</span>";
                    }
                    
                    $reviewerIds = explode(',',$reviewerId);
                    $reviewerDataArr = array();
                    if( $reviewerIds[0] != "" ){
                        foreach ($reviewerIds as $reviewerId) {
                            $idStauts = get_post_status( $reviewerId );
                            if ($idStauts == 'publish') {
                                $reviewerDataArr[] = $reviewerId;
                            }
                        }       
                    } else {
                        array_unshift($reviewerIds, "137");
                        array_push($reviewerDataArr, "137");        
                    }
                    
                    $reviewer_html = '';
                    if ( $reviewerIds[0] != "" ) { 
                        foreach ($reviewerDataArr as $reviewer) {
                            
                            $postss = get_post($reviewer);
                            if (!empty($reviewer)) { 
                                $reviewer_title = str_replace( ",","", str_replace( " ","-", strtolower( $postss->post_title ) )) ;
                                $reviewer_ID = $postss->ID;
                                $anchor_link = site_url()."/about-us?contributor_id=$reviewer_title";
                                $reviewer_html .= "<a data-id = '$reviewer_ID' href='javascript:void(0);'>$postss->post_title</a>, ";
                            }
                        }   
                    }
                    if( !empty( $reviewer_html ) ){
                        $reviewer_html = rtrim($reviewer_html, ", ");
                        $reviewer_html = "<span class='reviewed-author'> Reviewed By $reviewer_html</span>";
                    }
        $html .= "$contributo_html $reviewer_html";       
        $html .= "</div>
                <div class='banner-thumbnail-col'>
                <span class='update-date'><strong><span>Updated</span> ".$updated_date."</strong></span>
                    <span class='editor-value'><a href='".site_url().'/editorial-values'."' target='_blank'>Editorial Values</a></span>
                </div>
            </div>
        </div>
        <div class='banner_popup_main'></div>
        ";         
    
    if( $html != '' ){
        echo $html;
    }
    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
}

function cs_placement_button_block($attributes) {
    
    global $wpdb;

    ob_start();

    $eduLevel = $attributes['eduLevel'];
    $specialization = $attributes['specialization'];
    $fbSpecialization = $attributes['fbSpecialization'];
    $btnText = $attributes['btnText'];
    $linkText = $attributes['linkText'];

    $sb_subjects_data_tbl = $wpdb->prefix . 'cs_search_box_subject_data';
    $result = $wpdb->get_results( "SELECT sb_subject_id, sb_subject_name, sb_subject_abbrev FROM $sb_subjects_data_tbl Where sb_subject_abbrev = '$specialization' ");
    $specialization = (isset($result) && !empty($result)) ? $specialization : $fbSpecialization;
    
    if ( getenv( 'HTTP_CLIENT_IP' ) ) {
     $ipaddress = getenv( 'HTTP_CLIENT_IP' );
    } else if ( getenv( 'HTTP_X_FORWARDED_FOR' ) ) {
     $ipaddress = getenv( 'HTTP_X_FORWARDED_FOR' );
    } else if ( getenv( 'HTTP_X_FORWARDED' ) ) {
     $ipaddress = getenv( 'HTTP_X_FORWARDED' );
    } else if ( getenv( 'HTTP_FORWARDED_FOR' ) ) {
     $ipaddress = getenv( 'HTTP_FORWARDED_FOR' );
    } else if ( getenv( 'HTTP_FORWARDED' ) ) {
     $ipaddress = getenv( 'HTTP_FORWARDED' );
    } else if ( getenv( 'REMOTE_ADDR' ) ) {
     $ipaddress = getenv( 'REMOTE_ADDR' );
    } else {
     $ipaddress = 'UNKNOWN';
    }

    if( $ipaddress === '192.168.50.1'){
     $ipaddress = '103.254.244.62';
    }

    $urlTemplate = 'https://ipapi.co/' . $ipaddress . '/json/?key=91380a07aa3391743f49e52e68ea691aebf60e85';

    // replace the "%s" with real IP address
    $urlToCall = sprintf( $urlTemplate, $ipaddress);

    $rawJson = file_get_contents( $urlToCall );

    $geoLocation = json_decode( $rawJson );

    $state = $geoLocation->region_code;
    $current_state = $state;
    $state_full_array = get_state_full_name();

    if(empty($state_full_array['DC'])){
        $current_state = 'OutsideUS';
    }
    

    $html = "";

    $html .= '
    <div class="hcd-search-box-content placement-button-wrap">
        <div class="content">
            <div class="row">
                <form action="'.site_url( "/sb/search-results" ).'" method="POST" id="placement_button_form">
                    <input type="hidden" id="specialization" name="specialization" value="'.$specialization.'">
                    <input type="hidden" id="current_degree" name="current_degree" value="'.$eduLevel.'">
                    <input type="hidden" id="current_state" name="current_state" value="'.$current_state.'">
                    <input type="hidden" id="deg_abr" name="deg_abr" value="">
                    <input type="hidden" id="search_box_form" name="search_box_form" value="yes">
                    <div class="form-group-btn">
                        <input type="button" value="'.$btnText.'" id="btn_submit" alt="Find Healthcare Degrees" class="search_box_submit_btn org-btn">
                    </div>
                </form>
            </div>
        </div>
        <div class="dps-sponsered active-program-sponsored"><span class="sponsored"><a href="#" class="sponsor">'.$linkText.'</a></span>
            <div class="popup popup-container">
                <div class="popup-content">
                    <a href="#" class="close-popup">×</a>
                    <p>When you click on a sponsoring school or program advertised on our site, or fill out a form to request information from a sponsoring school, we may earn a commission. View our <a href="/advertising-policy">advertising disclosure</a> for more details.</p>
                </div>
            </div>
        </div>
    </div>';

        if( $html != '' ){
            echo $html;
        }
    wp_register_script( 'placement-button-js', get_bloginfo( 'stylesheet_directory' ) . '/js/placement-button.js?'.rand(), false );
    wp_enqueue_script( 'placement-button-js' );
    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
    
}

/**
 * @param $params
 * @return false|string
 */
function cs_horizontal_search_box_block($attributes) {
    global $wpdb;
    ob_start();

    $eduLevel = $attributes['eduLevel'];
    $specialization = $attributes['specialization'];
    $fbSpecialization = $attributes['fbSpecialization'];

    $sb_subjects_data_tbl = $wpdb->prefix . 'cs_search_box_subject_data';
    $result = $wpdb->get_results( "SELECT sb_subject_id, sb_subject_name, sb_subject_abbrev FROM $sb_subjects_data_tbl Where sb_subject_abbrev = '$specialization' ");
    $specialization = (isset($result) && !empty($result)) ? $specialization : $fbSpecialization;
    
    echo do_shortcode("[cs_horizontal_search_box edulevel='".$eduLevel."' specialization='".$specialization."' fbspecialization='".$fbSpecialization."']");
    
    $output_string = ob_get_contents();
    ob_end_clean();
    return $output_string;
    
}
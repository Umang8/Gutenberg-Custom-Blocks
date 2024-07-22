const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {Fragment} = wp.element;
const {InspectorControls} = wp.blockEditor;
const {serverSideRender: ServerSideRender} = wp;
const {PanelBody, ToggleControl} = wp.components;

const { postList, allPostsList, categoryPostsList, latestSchools, relatedPosts,  categoryLicenseList, careerLicenseList, categoryFaqPostsList, categoryBlogsList, searchBox, horizontalSBox, placemantButton } = require('./edit');

registerBlockType( 'select-post-list/post-list-block', {
    title: __('Post Listing Block'),
    icon: 'editor-ul',
    category: 'sechel-blocks',
    attributes: {
        posts: {
            type: 'array',
            default: []
        },
        checkList: {
            type: 'array',
            default: []
        },
        postType: {
            type: 'string',
            default: ''
        },
        postId: {
            type: 'array',
            default: []
        },
        postOrderBy: {
            type: 'string',
            default: 'date'
        },
        postOrder: {
            type: 'string',
            default: 'desc'
        }
    },

    edit: postList,

    save(props) {
        const { attributes: { posts, postType, postId, checkList, postOrderBy, postOrder }, setAttributes }	 = props;
        return null;
    },
} );

registerBlockType( 'select-post-list/latest-post-block', {
    title: __('Latest Posts Block'),
    icon: 'editor-ol',
    category: 'sechel-blocks',
    attributes: {
        posts: {
            type: 'array',
            default: []
        },
    },

    edit: function() {
        return (
            <Fragment>
                <ServerSideRender block="select-post-list/latest-post-block" />
            </Fragment>
        );
    },

    save(props) {
        const { attributes: { postType }, setAttributes }	 = props;
        return null;
    },
} );

/**
 * Register The Contributors Block.
 *
 */
registerBlockType('contributors-block-section/childpages', {
    title: 'Display Contributor Block',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function() {
        return (
            <Fragment>
                <ServerSideRender block="contributors-block-section/childpages" />
            </Fragment>
        );
    },

    save(attributes) {
        return null;
    }
});

registerBlockType('contributors-list-section/childpages', {
  title: 'Display Contributor List',
  icon: 'list-view',
  category: 'sechel-blocks',

  edit: function() {
    return (
      <Fragment>
        <ServerSideRender block="contributors-list-section/childpages" />
      </Fragment>
    );
  },

  save(attributes) {
    return null;
  }
});

registerBlockType('experts-list-section/childpages', {
    title: 'Display Experts List',
    icon: 'list-view',
    category: 'sechel-blocks',
  
    edit: function() {
      return (
        <Fragment>
          <ServerSideRender block="experts-list-section/childpages" />
        </Fragment>
      );
    },
  
    save(attributes) {
      return null;
    }
});

registerBlockType( 'select-post-list/all-posts-block', {
    title: __('All Posts Listing Block'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postType: {
            type: 'string',
            default: ''
        },
        postOrderBy: {
            type: 'string',
            default: 'date'
        },
        postOrder: {
            type: 'string',
            default: 'desc'
        },
        postPerPage: {
          type: 'string',
          default: 10
        },
    },

    edit: allPostsList,

    save(props) {
        const { attributes: { postType, postOrderBy, postOrder, postPerPage }, setAttributes }	 = props;
        return null;
    },
} );

registerBlockType( 'select-post-list/category-posts-block', {
  title: __('Posts Listing By Category'),
  icon: 'list-view',
  category: 'sechel-blocks',
  attributes: {
      postType: {
          type: 'string',
          default: ''
      },
      categoryList: {
          type: 'object',
          default: []
      },
      taxonomyList: {
        type: 'object',
        default: []
      },
      postTaxonomy: {
        type: 'string',
        default: ''
      },
      catId: {
        type: 'array',
        default: []
      }
  },

  edit: categoryPostsList,

  save(props) {
    const { attributes: { postType, categoryList, taxonomyList, postTaxonomy, catId }, setAttributes }	 = props;
    return null;
  },
} );

/**
 * Register FAQ block.
 *
 */
registerBlockType( 'select-post-list/faq-block', {
    title: __('FAQ Listing By Category'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postType: {
            type: 'string',
            default: ''
        },
        categoryList: {
            type: 'object',
            default: []
        },
        taxonomyList: {
            type: 'object',
            default: []
        },
        postTaxonomy: {
            type: 'string',
            default: ''
        },
        catId: {
            type: 'array',
            default: []
        },
        faqOrderBy: {
            type: 'string',
            default: 'title'
        },
        faqOrder: {
            type: 'string',
            default: 'asc'
        }
    },

    edit: categoryFaqPostsList,

    save(props) {
        const { attributes: { postType, categoryList, taxonomyList, postTaxonomy, catId, faqOrderBy, faqOrder }, setAttributes }	 = props;
        return null;
    },
} );

/**
 * Register License block.
 *
 */
registerBlockType( 'select-post-list/license-block', {
    title: __('Licenses Listing By Category'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postId: {
            type: 'string',
            default: ''
        },
        postCategory: {
            type: 'string',
        },
        categoryList: {
            type: 'object',
            default: []
        },
        postLists: {
            type: 'array',
        }

    },

    edit: categoryLicenseList,

    save(props) {
        const { attributes: { categoryList, postCategory, postLists, postId }, setAttributes }	 = props;
        return null;
    },
} );

/**
 * Register License List block.
 *
 */
registerBlockType( 'select-post-list/license-career-block', {
    title: __('Licenses Listing for Career'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {

        postCategory: {
            type: 'string',
        },
        categoryList: {
            type: 'object',
            default: []
        }

    },

    edit: careerLicenseList,

    save(props) {
        const { attributes: { categoryList, postCategory }, setAttributes }	 = props;
        return null;
    },
} );

/**
 * Register Searchbox block.
 *
 */
registerBlockType('nps-search-box/searchbox', {
    title: 'Search Box block',
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        eduLevel: {
            type: "string",
        },
        specialization: {
            type: "string",
        },
        fbSpecialization: {
            type: "string",
            default: ""
        },
        isOptionsLoaded: {
            type: "boolean",
            default: false
        }
    },
    edit: searchBox,

    save(attributes) {
      return null;
    }
});

/**
 * Register Horizontal Searchbox block.
 *
 */
registerBlockType('cs-search-box/horizontal-searchbox', {
  title: 'Horizontal Search Box block',
  icon: 'list-view',
  category: 'sechel-blocks',
  attributes: {
    eduLevel: {
            type: "string",
        },
        specialization: {
            type: "string",
        }
  },
  edit: horizontalSBox,

    save(attributes) {
        return null;
    }
});

/**
 * Register Placement Button block.
 *
 */
registerBlockType("cs-placement-button/searchbox", {
    title: "Placemant Button Block",
    icon: "list-view",
    category: "sechel-blocks",
    attributes: {
        
        eduLevel: {
            type: "string",
            default: 'hs diploma'
        },
        specialization: {
            type: "string",
            default: 'all'
        },
        fbSpecialization: {
            type: "string",
            default: ""
        },
        btnText: {
            type: "string",
            default: 'View Schools'
        },
        linkText: {
            type: "string",
            default: 'Sponsored'
        },
        isOptionsLoaded: {
            type: "boolean",
            default: false
        }
    },

    edit: placemantButton,

    save(attributes) {
        return null;
    }
});

/**
 * Register Latest Schools List block.
 *
 */
registerBlockType('nps-post-list/latest-schools-list', {
    title: 'Latest Schools List block',
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postType: {
            type: 'string',
            default: ''
        },
    },
    edit: latestSchools,
    save(props) {
        const { attributes: { postType }, setAttributes }	 = props;
        return null;
    }
});

registerBlockType('related-post-section/related-posts', {
  title: 'Display Related Posts',
  icon: 'list-view',
  category: 'sechel-blocks',
  attributes: {
    displayRelCareers: {
        type: 'boolean',
        default: true
      },
      displayRelPrograms: {
        type: 'boolean',
        default: true
      },
      programsTitle: {
        type: 'string',
        default: ''
      },
      blogsTitle: {
        type: 'string',
        default: ''
      },
      careersTitle: {
        type: 'string',
        default: ''
      },
      displayRelBlogs: {
        type: 'boolean',
        default: true
      },
      postType: {
        type: 'string',
        default: ''
      },
      postTypeBlog: {
        type: 'string',
        default: ''
      },
      postTypeCareers: {
        type: 'string',
        default: ''
      },
      excludeSelfPost: {
        type: 'boolean',
        default: true
      },
      excludeSelfBlog: {
        type: 'boolean',
        default: true
      },
      excludeSelfCareers: {
        type: 'boolean',
        default: true
      },
      displayLinks: {
        type: 'string',
        default: '7'
      },
      displayLinksBlog: {
        type: 'string',
        default: '7'
      },
      displayLinksCareers: {
        type: 'string',
        default: '7'
      },
      pullPostsBy: {
        type: 'string',
        default: 'primary'
      },
      pullCareersBy: {
        type: 'string',
        default: 'primary'
      },
      pullBlogsBy: {
        type: 'string',
        default: 'primary'
      }
  },

  edit: relatedPosts,

  save(props) {
    const { attributes: { postType, postTypeCareers, programsTitle, blogsTitle, careersTitle, postTypeBlog, excludeSelfPost, displayLinks, displayLinksBlog, displayLinksCareers, pullPostsBy, pullBlogsBy, pullCareersBy }, setAttributes }	 = props;
    return null;
  }
});

/**
 * Register Jump to Index Block.
 *
 */
registerBlockType('detail-page-section/progress-bar-block', {
    title: 'Progress Bar Block',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function() {
        return (
            <Fragment>
                <ServerSideRender block="detail-page-section/progress-bar-block" />
            </Fragment>
        );
    },

    save(attributes) {
        return null;
    }
});

/**
 * Register Jump to Index Block.
 *
 */
registerBlockType('detail-page-section/nearby-state-block', {
    title: 'Nearby State Block',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function() {
        return (
            <Fragment>
                <ServerSideRender block="detail-page-section/nearby-state-block" />
            </Fragment>
        );
    },

    save(attributes) {
        return null;
    }
});

registerBlockType( 'select-post-list/category-blogs-block', {
    title: __('Blogs Listing By Category'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postType: {
            type: 'string',
            default: ''
        },
        categoryList: {
            type: 'object',
            default: []
        },
        taxonomyList: {
          type: 'object',
          default: []
        },
        postTaxonomy: {
          type: 'string',
          default: ''
        },
        catId: {
          type: 'array',
          default: []
        },
        postPerPage: {
          type: 'number',
          default: 10
        },
    },
  
    edit: categoryBlogsList,
  
    save(props) {
      const { attributes: { postType, categoryList, taxonomyList, postTaxonomy, catId }, setAttributes }	 = props;
      return null;
    },
  } );

  /**
 * Register Respect Section Block.
 *
 */
registerBlockType('detail-page-section/respect-block', {
    title: 'Respect Section Block',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function() {
        return (
            <Fragment>
                <ServerSideRender block="detail-page-section/respect-block" />
            </Fragment>
        );
    },

    save(attributes) {
        return null;
    }
});

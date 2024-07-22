/******/ (function(modules) { // webpackBootstrap
/******/    // The module cache
/******/    var installedModules = {};
/******/
/******/    // The require function
/******/    function __webpack_require__(moduleId) {
/******/
/******/        // Check if module is in cache
/******/        if(installedModules[moduleId]) {
/******/            return installedModules[moduleId].exports;
/******/        }
/******/        // Create a new module (and put it into the cache)
/******/        var module = installedModules[moduleId] = {
/******/            i: moduleId,
/******/            l: false,
/******/            exports: {}
/******/        };
/******/
/******/        // Execute the module function
/******/        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/        // Flag the module as loaded
/******/        module.l = true;
/******/
/******/        // Return the exports of the module
/******/        return module.exports;
/******/    }
/******/
/******/
/******/    // expose the modules object (__webpack_modules__)
/******/    __webpack_require__.m = modules;
/******/
/******/    // expose the module cache
/******/    __webpack_require__.c = installedModules;
/******/
/******/    // define getter function for harmony exports
/******/    __webpack_require__.d = function(exports, name, getter) {
/******/        if(!__webpack_require__.o(exports, name)) {
/******/            Object.defineProperty(exports, name, {
/******/                configurable: false,
/******/                enumerable: true,
/******/                get: getter
/******/            });
/******/        }
/******/    };
/******/
/******/    // getDefaultExport function for compatibility with non-harmony modules
/******/    __webpack_require__.n = function(module) {
/******/        var getter = module && module.__esModule ?
/******/            function getDefault() { return module['default']; } :
/******/            function getModuleExports() { return module; };
/******/        __webpack_require__.d(getter, 'a', getter);
/******/        return getter;
/******/    };
/******/
/******/    // Object.prototype.hasOwnProperty.call
/******/    __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/    // __webpack_public_path__
/******/    __webpack_require__.p = "";
/******/
/******/    // Load entry module and return exports
/******/    return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __ = wp.i18n.__;
var registerBlockType = wp.blocks.registerBlockType;
var Fragment = wp.element.Fragment;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp = wp,
    ServerSideRender = _wp.serverSideRender;
var ServerSideRender = _wp.serverSideRender;
var PanelBody = wp.components.PanelBody;

var _require = __webpack_require__(1),
    postList = _require.postList,
    allPostsList = _require.allPostsList,
    categoryPostsList = _require.categoryPostsList,
    latestSchools = _require.latestSchools,
    relatedPosts = _require.relatedPosts,
    categoryLicenseList = _require.categoryLicenseList,
    careerLicenseList = _require.careerLicenseList,
    categoryFaqPostsList = _require.categoryFaqPostsList,
    categoryBlogsList = _require.categoryBlogsList,
    searchBox = _require.searchBox,
    horizontalSBox = _require.horizontalSBox,
    placemantButton = _require.placemantButton;

registerBlockType('select-post-list/post-list-block', {
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

    save: function save(props) {
        var _props$attributes = props.attributes,
            posts = _props$attributes.posts,
            postType = _props$attributes.postType,
            postId = _props$attributes.postId,
            checkList = _props$attributes.checkList,
            postOrderBy = _props$attributes.postOrderBy,
            postOrder = _props$attributes.postOrder,
            setAttributes = props.setAttributes;

        return null;
    }
});

registerBlockType('select-post-list/latest-post-block', {
    title: __('Latest Posts Block'),
    icon: 'editor-ol',
    category: 'sechel-blocks',
    attributes: {
        posts: {
            type: 'array',
            default: []
        }
    },

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'select-post-list/latest-post-block' })
        );
    },

    save: function save(props) {
        var postType = props.attributes.postType,
            setAttributes = props.setAttributes;

        return null;
    }
});

/**
 * Register The Contributors Block.
 *
 */
registerBlockType('contributors-block-section/childpages', {
    title: 'Display Contributor Block',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'contributors-block-section/childpages' })
        );
    },

    save: function save(attributes) {
        return null;
    }
});

registerBlockType('contributors-list-section/childpages', {
    title: 'Display Contributor List',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'contributors-list-section/childpages' })
        );
    },

    save: function save(attributes) {
        return null;
    }
});

registerBlockType('experts-list-section/childpages', {
    title: 'Display Experts List',
    icon: 'list-view',
    category: 'sechel-blocks',

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'experts-list-section/childpages' })
        );
    },

    save: function save(attributes) {
        return null;
    }
});

registerBlockType('select-post-list/all-posts-block', {
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
        }
    },

    edit: allPostsList,

    save: function save(props) {
        var _props$attributes2 = props.attributes,
            postType = _props$attributes2.postType,
            postOrderBy = _props$attributes2.postOrderBy,
            postOrder = _props$attributes2.postOrder,
            postPerPage = _props$attributes2.postPerPage,
            setAttributes = props.setAttributes;

        return null;
    }
});

registerBlockType('select-post-list/category-posts-block', {
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

    save: function save(props) {
        var _props$attributes3 = props.attributes,
            postType = _props$attributes3.postType,
            categoryList = _props$attributes3.categoryList,
            taxonomyList = _props$attributes3.taxonomyList,
            postTaxonomy = _props$attributes3.postTaxonomy,
            catId = _props$attributes3.catId,
            setAttributes = props.setAttributes;

        return null;
    }
});

/**
 * Register FAQ block.
 *
 */
registerBlockType('select-post-list/faq-block', {
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

    save: function save(props) {
        var _props$attributes4 = props.attributes,
            postType = _props$attributes4.postType,
            categoryList = _props$attributes4.categoryList,
            taxonomyList = _props$attributes4.taxonomyList,
            postTaxonomy = _props$attributes4.postTaxonomy,
            catId = _props$attributes4.catId,
            faqOrderBy = _props$attributes4.faqOrderBy,
            faqOrder = _props$attributes4.faqOrder,
            setAttributes = props.setAttributes;

        return null;
    }
});

/**
 * Register License block.
 *
 */
registerBlockType('select-post-list/license-block', {
    title: __('Licenses Listing By Category'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {
        postId: {
            type: 'string',
            default: ''
        },
        postCategory: {
            type: 'string'
        },
        categoryList: {
            type: 'object',
            default: []
        },
        postLists: {
            type: 'array'
        }

    },

    edit: categoryLicenseList,

    save: function save(props) {
        var _props$attributes5 = props.attributes,
            categoryList = _props$attributes5.categoryList,
            postCategory = _props$attributes5.postCategory,
            postLists = _props$attributes5.postLists,
            postId = _props$attributes5.postId,
            setAttributes = props.setAttributes;

        return null;
    }
});

/**
 * Register License List block.
 *
 */
registerBlockType('select-post-list/license-career-block', {
    title: __('Licenses Listing for Career'),
    icon: 'list-view',
    category: 'sechel-blocks',
    attributes: {

        postCategory: {
            type: 'string'
        },
        categoryList: {
            type: 'object',
            default: []
        }

    },

    edit: careerLicenseList,

    save: function save(props) {
        var _props$attributes6 = props.attributes,
            categoryList = _props$attributes6.categoryList,
            postCategory = _props$attributes6.postCategory,
            setAttributes = props.setAttributes;

        return null;
    }
});

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
            type: "string"
        },
        specialization: {
            type: "string"
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

    save: function save(attributes) {
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
            type: "string"
        },
        specialization: {
            type: "string"
        },
        fbSpecialization: {
            type: "string",
            default: ""
        }
    },
    edit: horizontalSBox,

    save: function save(attributes) {
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
            default: ''
        },
        specialization: {
            type: "string",
            default: ''
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

    save: function save(attributes) {
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
        }
    },
    edit: latestSchools,
    save: function save(props) {
        var postType = props.attributes.postType,
            setAttributes = props.setAttributes;

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

    save: function save(props) {
        var _props$attributes7 = props.attributes,
            postType = _props$attributes7.postType,
            postTypeCareers = _props$attributes7.postTypeCareers,
            programsTitle = _props$attributes7.programsTitle,
            blogsTitle = _props$attributes7.blogsTitle,
            careersTitle = _props$attributes7.careersTitle,
            postTypeBlog = _props$attributes7.postTypeBlog,
            excludeSelfPost = _props$attributes7.excludeSelfPost,
            displayLinks = _props$attributes7.displayLinks,
            displayLinksBlog = _props$attributes7.displayLinksBlog,
            displayLinksCareers = _props$attributes7.displayLinksCareers,
            pullPostsBy = _props$attributes7.pullPostsBy,
            pullBlogsBy = _props$attributes7.pullBlogsBy,
            pullCareersBy = _props$attributes7.pullCareersBy,
            setAttributes = props.setAttributes;

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

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'detail-page-section/progress-bar-block' })
        );
    },

    save: function save(attributes) {
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

    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'detail-page-section/nearby-state-block' })
        );
    },

    save: function save(attributes) {
        return null;
    }
});

/**
 * Register Respect Section Block.
 *
 */
registerBlockType('detail-page-section/respect-block', {
    title: 'Respect Section Block',
    icon: 'list-view',
    category: 'sechel-blocks',
    edit: function edit() {
        return wp.element.createElement(
            Fragment,
            null,
            wp.element.createElement(ServerSideRender, { block: 'detail-page-section/respect-block' })
        );
    },
    save: function save(attributes) {
        return null;
    }
});

registerBlockType('select-post-list/category-blogs-block', {
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
        }
    },

    edit: categoryBlogsList,

    save: function save(props) {
        var _props$attributes8 = props.attributes,
            postType = _props$attributes8.postType,
            categoryList = _props$attributes8.categoryList,
            taxonomyList = _props$attributes8.taxonomyList,
            postTaxonomy = _props$attributes8.postTaxonomy,
            catId = _props$attributes8.catId,
            setAttributes = props.setAttributes;

        return null;
    }
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __ = wp.i18n.__;
var _wp$element = wp.element,
    Fragment = _wp$element.Fragment,
    Component = _wp$element.Component;
var InspectorControls = wp.blockEditor.InspectorControls;
var _wp = wp,
    ServerSideRender = _wp.serverSideRender;
var _wp$components = wp.components,
    SelectControl = _wp$components.SelectControl,
    CheckboxControl = _wp$components.CheckboxControl,
    RadioControl = _wp$components.RadioControl,
    PanelBody = _wp$components.PanelBody,
    TextControl = _wp$components.TextControl,
    ToggleControl = _wp$components.ToggleControl;

var postList = function (_Component) {
  _inherits(postList, _Component);

  function postList(props) {
    var _ref;

    _classCallCheck(this, postList);

    var _this = _possibleConstructorReturn(this, (_ref = postList.__proto__ || Object.getPrototypeOf(postList)).call.apply(_ref, [this].concat(_toConsumableArray(props))));

    _this.state = {
      checkboxPost: false,
      postType: '',
      options: [],
      checkList: []
    };
    _this.onPostSelect = _this.onPostSelect.bind(_this);
    _this.onTypeSelect = _this.onTypeSelect.bind(_this);
    return _this;
  }

  _createClass(postList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var pType = this.props.attributes.postType;
      this.onTypeSelect(pType);
      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this2.setState({ options: optionsArr });
      });
    }
  }, {
    key: 'onTypeSelect',
    value: function onTypeSelect(postType) {
      var _this3 = this;

      if (postType) {
        var postArr = [];
        wp.apiFetch({ path: '/post_type/v1/post_list/?post_type=' + postType }).then(function (posts) {
          var post = posts.map(function (post, key) {
            postArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });
          _this3.setState({ checkboxPost: true });
          _this3.props.setAttributes({ checkList: postArr, postType: postType });
        });
      }
      this.setState({ postType: '' });
      this.props.setAttributes({ postType: '' });
    }
  }, {
    key: 'onPostSelect',
    value: function onPostSelect(e, value) {
      var _props = this.props,
          postId = _props.attributes.postId,
          setAttributes = _props.setAttributes;

      var arr2 = [].concat(_toConsumableArray(postId));
      var index = arr2.indexOf(value);
      if (true === e) {
        arr2.push(value);
      } else {
        arr2.splice(index, 1);
      }
      setAttributes({ postId: arr2 });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          _props2$attributes = _props2.attributes,
          postType = _props2$attributes.postType,
          postId = _props2$attributes.postId,
          checkList = _props2$attributes.checkList,
          postOrderBy = _props2$attributes.postOrderBy,
          postOrder = _props2$attributes.postOrder,
          setAttributes = _props2.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post type',
              value: postType,
              onChange: this.onTypeSelect,
              options: this.state.options
            }),
            postType && checkList && checkList.map(function (item, key) {
              return wp.element.createElement(CheckboxControl, {
                label: item.label,
                value: item.value,
                checked: -1 < postId.indexOf(item.value),
                onChange: function onChange(e) {
                  return _this4.onPostSelect(e, item.value);
                }
              });
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: __('Attributes Settings ') },
            postType && wp.element.createElement(RadioControl, {
              label: 'Order By',
              help: 'Please select by which parameter you want to order',
              selected: postOrderBy,
              options: [{ label: 'Date', value: 'date' }, { label: 'Title', value: 'title' }, { label: 'Custom', value: 'custom' }],
              onChange: function onChange(value) {
                return setAttributes({ postOrderBy: value });
              }
            }),
            postType && wp.element.createElement(RadioControl, {
              label: 'Order',
              help: 'Please select order',
              selected: postOrder,
              options: [{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }],
              onChange: function onChange(value) {
                return setAttributes({ postOrder: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/post-list-block',
          attributes: { 'postId': postId, 'postType': postType, 'postOrderBy': postOrderBy, 'postOrder': postOrder } })
      )];
    }
  }]);

  return postList;
}(Component);

var allPostsList = function (_Component2) {
  _inherits(allPostsList, _Component2);

  function allPostsList(props) {
    var _ref2;

    _classCallCheck(this, allPostsList);

    var _this5 = _possibleConstructorReturn(this, (_ref2 = allPostsList.__proto__ || Object.getPrototypeOf(allPostsList)).call.apply(_ref2, [this].concat(_toConsumableArray(props))));

    _this5.state = {
      postType: ''
    };
    return _this5;
  }

  _createClass(allPostsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this6 = this;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this6.setState({ options: optionsArr });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          _props3$attributes = _props3.attributes,
          postType = _props3$attributes.postType,
          postOrderBy = _props3$attributes.postOrderBy,
          postOrder = _props3$attributes.postOrder,
          postPerPage = _props3$attributes.postPerPage,
          setAttributes = _props3.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              onChange: function onChange(value) {
                return setAttributes({ postType: value });
              },
              options: this.state.options
            }),
            wp.element.createElement(TextControl, {
              label: 'Posts Per Page',
              type: 'number',
              value: postPerPage,
              min: '1',
              max: '100',
              step: '1',
              onChange: function onChange(value) {
                return setAttributes({ postPerPage: value });
              }
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: __('Attributes Settings ') },
            postType && wp.element.createElement(RadioControl, {
              label: 'Order By',
              help: 'Please select by which parameter you want to order',
              selected: postOrderBy,
              options: [{ label: 'Date', value: 'date' }, { label: 'Title', value: 'title' }],
              onChange: function onChange(value) {
                return setAttributes({ postOrderBy: value });
              }
            }),
            postType && wp.element.createElement(RadioControl, {
              label: 'Order',
              help: 'Please select order',
              selected: postOrder,
              options: [{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }],
              onChange: function onChange(value) {
                return setAttributes({ postOrder: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/all-posts-block',
          attributes: { 'postType': postType, 'postOrderBy': postOrderBy, 'postOrder': postOrder, 'postPerPage': postPerPage } })
      )];
    }
  }]);

  return allPostsList;
}(Component);

var latestSchools = function (_Component3) {
  _inherits(latestSchools, _Component3);

  function latestSchools(props) {
    var _ref3;

    _classCallCheck(this, latestSchools);

    var _this7 = _possibleConstructorReturn(this, (_ref3 = latestSchools.__proto__ || Object.getPrototypeOf(latestSchools)).call.apply(_ref3, [this].concat(_toConsumableArray(props))));

    _this7.state = {
      postType: ''
    };
    return _this7;
  }

  _createClass(latestSchools, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this8 = this;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this8.setState({ options: optionsArr });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props,
          attributes = _props4.attributes,
          setAttributes = _props4.setAttributes;
      var postType = attributes.postType;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              help: 'Select Post Type which contains A to Z alphabetic meta value',
              onChange: function onChange(value) {
                return setAttributes({ postType: value });
              },
              options: this.state.options
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, { block: 'nps-post-list/latest-schools-list',
          attributes: { 'postType': postType } })
      )];
    }
  }]);

  return latestSchools;
}(Component);

var categoryPostsList = function (_Component4) {
  _inherits(categoryPostsList, _Component4);

  function categoryPostsList(props) {
    var _ref4;

    _classCallCheck(this, categoryPostsList);

    var _this9 = _possibleConstructorReturn(this, (_ref4 = categoryPostsList.__proto__ || Object.getPrototypeOf(categoryPostsList)).call.apply(_ref4, [this].concat(_toConsumableArray(props))));

    _this9.state = {
      checkboxCat: false,
      postType: '',
      taxonomyList: [],
      categoryList: [],
      postTaxonomy: ''
    };
    _this9.onTaxonomySelect = _this9.onTaxonomySelect.bind(_this9);
    _this9.onCategorySelect = _this9.onCategorySelect.bind(_this9);
    return _this9;
  }

  _createClass(categoryPostsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this10 = this;

      var _props5 = this.props,
          _props5$attributes = _props5.attributes,
          postType = _props5$attributes.postType,
          postTaxonomy = _props5$attributes.postTaxonomy,
          catId = _props5$attributes.catId,
          setAttributes = _props5.setAttributes;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this10.setState({ options: optionsArr });
      });
      this.onTaxonomySelect(postType);
      this.onCategorySelect(postTaxonomy);
    }
  }, {
    key: 'onCatSelect',
    value: function onCatSelect(e, value) {
      var _props6 = this.props,
          catId = _props6.attributes.catId,
          setAttributes = _props6.setAttributes;

      var arr2 = [].concat(_toConsumableArray(catId));
      var index = arr2.indexOf(value);
      if (true === e) {
        arr2.push(value);
      } else {
        arr2.splice(index, 1);
      }
      setAttributes({ catId: arr2 });
    }
  }, {
    key: 'onTaxonomySelect',
    value: function onTaxonomySelect(postType) {
      var _this11 = this;

      var _props7 = this.props,
          postTaxonomy = _props7.attributes.postTaxonomy,
          setAttributes = _props7.setAttributes;

      if (postType) {
        var taxArr = [{ label: __('Select'), value: '' }];
        wp.apiFetch({ path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(function (posts) {
          var post = posts.map(function (post, key) {
            taxArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this11.setState({ taxonomyList: taxArr });
          setAttributes({ taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'onCategorySelect',
    value: function onCategorySelect(postTaxonomy) {
      var _this12 = this;

      if (postTaxonomy) {
        var catArr = [];
        wp.apiFetch({ path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(function (posts) {
          var post = posts.map(function (post, key) {
            catArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this12.setState({ checkboxCat: true });
          _this12.props.setAttributes({ categoryList: catArr, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this13 = this;

      var _props8 = this.props,
          _props8$attributes = _props8.attributes,
          postType = _props8$attributes.postType,
          catId = _props8$attributes.catId,
          taxonomyList = _props8$attributes.taxonomyList,
          postTaxonomy = _props8$attributes.postTaxonomy,
          categoryList = _props8$attributes.categoryList,
          setAttributes = _props8.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              onChange: this.onTaxonomySelect,
              options: this.state.options
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Taxonomy',
              value: postTaxonomy,
              onChange: this.onCategorySelect,
              options: this.state.taxonomyList
            }),
            postTaxonomy && categoryList.map(function (item, key) {
              return wp.element.createElement(CheckboxControl, {
                label: item.label,
                value: item.value,
                checked: -1 < catId.indexOf(item.value),
                onChange: function onChange(e) {
                  return _this13.onCatSelect(e, item.value);
                }
              });
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/category-posts-block',
          attributes: { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId } })
      )];
    }
  }]);

  return categoryPostsList;
}(Component);

var categoryFaqPostsList = function (_Component5) {
  _inherits(categoryFaqPostsList, _Component5);

  function categoryFaqPostsList(props) {
    var _ref5;

    _classCallCheck(this, categoryFaqPostsList);

    var _this14 = _possibleConstructorReturn(this, (_ref5 = categoryFaqPostsList.__proto__ || Object.getPrototypeOf(categoryFaqPostsList)).call.apply(_ref5, [this].concat(_toConsumableArray(props))));

    _this14.state = {
      checkboxCat: false,
      postType: '',
      taxonomyList: [],
      categoryList: [],
      postTaxonomy: ''
    };
    _this14.onTaxonomySelect = _this14.onTaxonomySelect.bind(_this14);
    _this14.onCategorySelect = _this14.onCategorySelect.bind(_this14);
    return _this14;
  }

  _createClass(categoryFaqPostsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this15 = this;

      var _props9 = this.props,
          _props9$attributes = _props9.attributes,
          postType = _props9$attributes.postType,
          postTaxonomy = _props9$attributes.postTaxonomy,
          catId = _props9$attributes.catId,
          setAttributes = _props9.setAttributes;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this15.setState({ options: optionsArr });
      });
      this.onTaxonomySelect(postType);
      this.onCategorySelect(postTaxonomy);
    }
  }, {
    key: 'onCatSelect',
    value: function onCatSelect(e, value) {
      var _props10 = this.props,
          catId = _props10.attributes.catId,
          setAttributes = _props10.setAttributes;

      var arr2 = [].concat(_toConsumableArray(catId));
      var index = arr2.indexOf(value);
      if (true === e) {
        arr2.push(value);
      } else {
        arr2.splice(index, 1);
      }
      setAttributes({ catId: arr2 });
    }
  }, {
    key: 'onTaxonomySelect',
    value: function onTaxonomySelect(postType) {
      var _this16 = this;

      var _props11 = this.props,
          postTaxonomy = _props11.attributes.postTaxonomy,
          setAttributes = _props11.setAttributes;

      if (postType) {
        var taxArr = [{ label: __('Select'), value: '' }];
        wp.apiFetch({ path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(function (posts) {
          var post = posts.map(function (post, key) {
            taxArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this16.setState({ taxonomyList: taxArr });
          setAttributes({ taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'onCategorySelect',
    value: function onCategorySelect(postTaxonomy) {
      var _this17 = this;

      if (postTaxonomy) {
        var catArr = [];
        wp.apiFetch({ path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(function (posts) {
          var post = posts.map(function (post, key) {
            catArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this17.setState({ checkboxCat: true });
          _this17.props.setAttributes({ categoryList: catArr, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this18 = this;

      var _props12 = this.props,
          _props12$attributes = _props12.attributes,
          postType = _props12$attributes.postType,
          catId = _props12$attributes.catId,
          taxonomyList = _props12$attributes.taxonomyList,
          postTaxonomy = _props12$attributes.postTaxonomy,
          categoryList = _props12$attributes.categoryList,
          faqOrderBy = _props12$attributes.faqOrderBy,
          faqOrder = _props12$attributes.faqOrder,
          setAttributes = _props12.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              onChange: this.onTaxonomySelect,
              options: this.state.options
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Taxonomy',
              value: postTaxonomy,
              onChange: this.onCategorySelect,
              options: this.state.taxonomyList
            }),
            postTaxonomy && categoryList.map(function (item, key) {
              return wp.element.createElement(CheckboxControl, {
                label: item.label,
                value: item.value,
                checked: -1 < catId.indexOf(item.value),
                onChange: function onChange(e) {
                  return _this18.onCatSelect(e, item.value);
                }
              });
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: __('Attributes Settings ') },
            postType && wp.element.createElement(RadioControl, {
              label: 'Order By',
              help: 'Please select by which parameter you want to order',
              selected: faqOrderBy,
              options: [{ label: 'Date', value: 'date' }, { label: 'Title', value: 'title' }, { label: 'Custom', value: 'custom' }],
              onChange: function onChange(value) {
                return setAttributes({ faqOrderBy: value });
              }
            }),
            postType && wp.element.createElement(RadioControl, {
              label: 'Order',
              help: 'Please select order',
              selected: faqOrder,
              options: [{ label: 'Ascending', value: 'asc' }, { label: 'Descending', value: 'desc' }],
              onChange: function onChange(value) {
                return setAttributes({ faqOrder: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/faq-block',
          attributes: { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId, 'faqOrderBy': faqOrderBy, 'faqOrder': faqOrder } })
      )];
    }
  }]);

  return categoryFaqPostsList;
}(Component);

var categoryLicenseList = function (_Component6) {
  _inherits(categoryLicenseList, _Component6);

  function categoryLicenseList(props) {
    var _ref6;

    _classCallCheck(this, categoryLicenseList);

    var _this19 = _possibleConstructorReturn(this, (_ref6 = categoryLicenseList.__proto__ || Object.getPrototypeOf(categoryLicenseList)).call.apply(_ref6, [this].concat(_toConsumableArray(props))));

    _this19.state = {
      postId: '',
      categoryList: [],
      postLists: []
    };
    _this19.onCategorySelect = _this19.onCategorySelect.bind(_this19);
    return _this19;
  }

  _createClass(categoryLicenseList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this20 = this;

      var _props13 = this.props,
          _props13$attributes = _props13.attributes,
          postTaxonomy = _props13$attributes.postTaxonomy,
          postCategory = _props13$attributes.postCategory,
          setAttributes = _props13.setAttributes;

      var catArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_category/?post_taxonomy=license_type' }).then(function (posts) {
        var post = posts.map(function (post, key) {
          catArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this20.setState({ categoryList: catArr });
        _this20.props.setAttributes({ categoryList: catArr, postTaxonomy: postTaxonomy });
      });
      this.onCategorySelect(postCategory);
    }
  }, {
    key: 'onCategorySelect',
    value: function onCategorySelect(postCategory) {
      var _this21 = this;

      if (postCategory) {
        var postArr = [{ label: __('Select'), value: '' }];
        wp.apiFetch({ path: '/post_type/v1/post_term/?term_id=' + postCategory }).then(function (posts) {
          var post = posts.map(function (post, key) {
            postArr.push({
              label: __(post.title),
              value: __(post.id)
            });
          });
          _this21.setState({ postLists: postArr });
          _this21.props.setAttributes({ postLists: postArr, postCategory: postCategory });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props14 = this.props,
          _props14$attributes = _props14.attributes,
          categoryList = _props14$attributes.categoryList,
          postLists = _props14$attributes.postLists,
          postCategory = _props14$attributes.postCategory,
          postId = _props14$attributes.postId,
          setAttributes = _props14.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('License List Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Category',
              value: postCategory,
              onChange: this.onCategorySelect,
              options: this.state.categoryList
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Post',
              value: postId,
              onChange: function onChange(value) {
                return setAttributes({ postId: value });
              },
              options: this.state.postLists
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/license-block',
          attributes: { 'categoryList': categoryList, 'postLists': postLists, 'postCategory': postCategory, 'postId': postId } })
      )];
    }
  }]);

  return categoryLicenseList;
}(Component);

var careerLicenseList = function (_Component7) {
  _inherits(careerLicenseList, _Component7);

  function careerLicenseList(props) {
    var _ref7;

    _classCallCheck(this, careerLicenseList);

    var _this22 = _possibleConstructorReturn(this, (_ref7 = careerLicenseList.__proto__ || Object.getPrototypeOf(careerLicenseList)).call.apply(_ref7, [this].concat(_toConsumableArray(props))));

    _this22.state = {
      categoryList: [],
      postLists: []
    };
    _this22.onCategorySelect = _this22.onCategorySelect.bind(_this22);
    return _this22;
  }

  _createClass(careerLicenseList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this23 = this;

      var _props15 = this.props,
          _props15$attributes = _props15.attributes,
          postTaxonomy = _props15$attributes.postTaxonomy,
          postCategory = _props15$attributes.postCategory,
          setAttributes = _props15.setAttributes;

      var catArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_category/?post_taxonomy=license_type' }).then(function (posts) {
        var post = posts.map(function (post, key) {
          catArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this23.setState({ categoryList: catArr });
        _this23.props.setAttributes({ categoryList: catArr, postTaxonomy: postTaxonomy });
      });
      this.onCategorySelect(postCategory);
    }
  }, {
    key: 'onCategorySelect',
    value: function onCategorySelect(postCategory) {
      var _this24 = this;

      if (postCategory) {
        var postArr = [{ label: __('Select'), value: '' }];
        wp.apiFetch({ path: '/post_type/v1/post_term/?term_id=' + postCategory }).then(function (posts) {
          var post = posts.map(function (post, key) {
            postArr.push({
              label: __(post.title),
              value: __(post.id)
            });
          });
          _this24.setState({ postLists: postArr });
          _this24.props.setAttributes({ postLists: postArr, postCategory: postCategory });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props16 = this.props,
          _props16$attributes = _props16.attributes,
          categoryList = _props16$attributes.categoryList,
          postCategory = _props16$attributes.postCategory,
          setAttributes = _props16.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('License List Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Category',
              value: postCategory,
              onChange: this.onCategorySelect,
              options: this.state.categoryList
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/license-career-block',
          attributes: { 'categoryList': categoryList, 'postCategory': postCategory } })
      )];
    }
  }]);

  return careerLicenseList;
}(Component);

var relatedPosts = function (_Component8) {
  _inherits(relatedPosts, _Component8);

  function relatedPosts(props) {
    var _ref8;

    _classCallCheck(this, relatedPosts);

    var _this25 = _possibleConstructorReturn(this, (_ref8 = relatedPosts.__proto__ || Object.getPrototypeOf(relatedPosts)).call.apply(_ref8, [this].concat(_toConsumableArray(props))));

    _this25.state = {
      postType: ''
    };
    return _this25;
  }

  _createClass(relatedPosts, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this26 = this;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this26.setState({ options: optionsArr });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props17 = this.props,
          attributes = _props17.attributes,
          setAttributes = _props17.setAttributes;
      var displayRelPrograms = attributes.displayRelPrograms,
          programsTitle = attributes.programsTitle,
          careersTitle = attributes.careersTitle,
          displayRelBlogs = attributes.displayRelBlogs,
          displayRelCareers = attributes.displayRelCareers,
          postType = attributes.postType,
          postTypeBlog = attributes.postTypeBlog,
          postTypeCareers = attributes.postTypeCareers,
          excludeSelfPost = attributes.excludeSelfPost,
          blogsTitle = attributes.blogsTitle,
          excludeSelfBlog = attributes.excludeSelfBlog,
          excludeSelfCareers = attributes.excludeSelfCareers,
          displayLinks = attributes.displayLinks,
          displayLinksBlog = attributes.displayLinksBlog,
          displayLinksCareers = attributes.displayLinksCareers,
          pullPostsBy = attributes.pullPostsBy,
          pullBlogsBy = attributes.pullBlogsBy,
          pullCareersBy = attributes.pullCareersBy;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Related Careers Settings ') },
            wp.element.createElement(ToggleControl, {
              label: 'Display Related Careers',
              checked: displayRelCareers,
              onChange: function onChange(value) {
                return setAttributes({ displayRelCareers: value });
              }
            }),
            wp.element.createElement(TextControl, {
              label: 'Careers Block Title',
              type: 'string',
              value: careersTitle,
              onChange: function onChange(value) {
                return setAttributes({ careersTitle: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postTypeCareers,
              help: 'Select Post Type for related Careers',
              onChange: function onChange(value) {
                return setAttributes({ postTypeCareers: value });
              },
              options: this.state.options
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Exclude Self',
              checked: excludeSelfCareers,
              onChange: function onChange(value) {
                return setAttributes({ excludeSelfCareers: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: 'Pull By Tags',
              value: pullCareersBy,
              options: [{ label: __('Primary'), value: 'primary' }, { label: __('Both'), value: 'both' }],
              help: 'Select You want posts by Primary only or both',
              onChange: function onChange(value) {
                return setAttributes({ pullCareersBy: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: __('Links to Display'),
              value: displayLinksCareers,
              options: [{ label: __('Default'), value: '7' }, { label: __('3'), value: '3' }, { label: __('5'), value: '5' }, { label: __('10'), value: '10' }, { label: __('All'), value: 'all' }],
              onChange: function onChange(value) {
                return setAttributes({ displayLinksCareers: value });
              }
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: __('Related Programs Settings ') },
            wp.element.createElement(ToggleControl, {
              label: 'Display Related Programs',
              checked: displayRelPrograms,
              onChange: function onChange(value) {
                return setAttributes({ displayRelPrograms: value });
              }
            }),
            wp.element.createElement(TextControl, {
              label: 'Programs Block Title',
              type: 'string',
              value: programsTitle,
              onChange: function onChange(value) {
                return setAttributes({ programsTitle: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              help: 'Select Post Type for related posts',
              onChange: function onChange(value) {
                return setAttributes({ postType: value });
              },
              options: this.state.options
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Exclude Self',
              checked: excludeSelfPost,
              onChange: function onChange(value) {
                return setAttributes({ excludeSelfPost: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: 'Pull By Tags',
              value: pullPostsBy,
              options: [{ label: __('Primary'), value: 'primary' }, { label: __('Both'), value: 'both' }],
              help: 'Select You want posts by Primary only or both',
              onChange: function onChange(value) {
                return setAttributes({ pullPostsBy: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: __('Links to Display'),
              value: displayLinks,
              options: [{ label: __('Default'), value: '7' }, { label: __('3'), value: '3' }, { label: __('5'), value: '5' }, { label: __('10'), value: '10' }, { label: __('All'), value: 'all' }],
              onChange: function onChange(value) {
                return setAttributes({ displayLinks: value });
              }
            })
          ),
          wp.element.createElement(
            PanelBody,
            { title: __('Related Blog Settings ') },
            wp.element.createElement(ToggleControl, {
              label: 'Display Related Blogs',
              checked: displayRelBlogs,
              onChange: function onChange(value) {
                return setAttributes({ displayRelBlogs: value });
              }
            }),
            wp.element.createElement(TextControl, {
              label: 'Blogs Block Title',
              type: 'string',
              value: blogsTitle,
              onChange: function onChange(value) {
                return setAttributes({ blogsTitle: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Blog Post Type',
              value: postTypeBlog,
              help: 'Select Post Type for Blog related posts',
              onChange: function onChange(value) {
                return setAttributes({ postTypeBlog: value });
              },
              options: this.state.options
            }),
            wp.element.createElement(ToggleControl, {
              label: 'Exclude Self',
              checked: excludeSelfBlog,
              onChange: function onChange(value) {
                return setAttributes({ excludeSelfBlog: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: __('Links to Display'),
              value: displayLinksBlog,
              options: [{ label: __('Default'), value: '7' }, { label: __('3'), value: '3' }, { label: __('5'), value: '5' }, { label: __('10'), value: '10' }, { label: __('All'), value: 'all' }],
              onChange: function onChange(value) {
                return setAttributes({ displayLinksBlog: value });
              }
            }),
            wp.element.createElement(SelectControl, {
              label: __('Pull By Tags'),
              value: pullBlogsBy,
              options: [{ label: __('Primary'), value: 'primary' }, { label: __('Both'), value: 'both' }],
              help: 'Select You want posts by Primary only or both',
              onChange: function onChange(value) {
                return setAttributes({ pullBlogsBy: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, { block: 'related-post-section/related-posts',
          attributes: { 'displayRelPrograms': displayRelPrograms, 'displayRelCareers': displayRelCareers, 'blogsTitle': blogsTitle, 'careersTitle': careersTitle, 'postType': postType, 'excludeSelfPost': excludeSelfPost, 'displayLinks': displayLinks,
            'postTypeBlog': postTypeBlog, 'postTypeCareers': postTypeCareers, 'displayRelBlogs': displayRelBlogs, 'programsTitle': programsTitle, 'excludeSelfBlog': excludeSelfBlog, 'excludeSelfCareers': excludeSelfCareers, 'displayLinksBlog': displayLinksBlog, 'displayLinksCareers': displayLinksCareers,
            'pullBlogsBy': pullBlogsBy, 'pullPostsBy': pullPostsBy, 'pullCareersBy': pullCareersBy } })
      )];
    }
  }]);

  return relatedPosts;
}(Component);

var categoryBlogsList = function (_Component9) {
  _inherits(categoryBlogsList, _Component9);

  function categoryBlogsList(props) {
    var _ref9;

    _classCallCheck(this, categoryBlogsList);

    var _this27 = _possibleConstructorReturn(this, (_ref9 = categoryBlogsList.__proto__ || Object.getPrototypeOf(categoryBlogsList)).call.apply(_ref9, [this].concat(_toConsumableArray(props))));

    _this27.state = {
      checkboxCat: false,
      postType: '',
      taxonomyList: [],
      categoryList: [],
      postTaxonomy: ''
    };
    _this27.onTaxonomySelect = _this27.onTaxonomySelect.bind(_this27);
    _this27.onCategorySelect = _this27.onCategorySelect.bind(_this27);
    return _this27;
  }

  _createClass(categoryBlogsList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this28 = this;

      var _props18 = this.props,
          _props18$attributes = _props18.attributes,
          postType = _props18$attributes.postType,
          postTaxonomy = _props18$attributes.postTaxonomy,
          catId = _props18$attributes.catId,
          setAttributes = _props18.setAttributes;

      var optionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/post_data/' }).then(function (posts) {
        posts.map(function (post, key) {
          return optionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
        _this28.setState({ options: optionsArr });
      });
      this.onTaxonomySelect(postType);
      this.onCategorySelect(postTaxonomy);
    }
  }, {
    key: 'onCatSelect',
    value: function onCatSelect(e, value) {
      var _props19 = this.props,
          catId = _props19.attributes.catId,
          setAttributes = _props19.setAttributes;

      var arr2 = [].concat(_toConsumableArray(catId));
      var index = arr2.indexOf(value);
      if (true === e) {
        arr2.push(value);
      } else {
        arr2.splice(index, 1);
      }
      setAttributes({ catId: arr2 });
    }
  }, {
    key: 'onTaxonomySelect',
    value: function onTaxonomySelect(postType) {
      var _this29 = this;

      var _props20 = this.props,
          postTaxonomy = _props20.attributes.postTaxonomy,
          setAttributes = _props20.setAttributes;

      if (postType) {
        var taxArr = [{ label: __('Select'), value: '' }];
        wp.apiFetch({ path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(function (posts) {
          var post = posts.map(function (post, key) {
            taxArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this29.setState({ taxonomyList: taxArr });
          setAttributes({ taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'onCategorySelect',
    value: function onCategorySelect(postTaxonomy) {
      var _this30 = this;

      if (postTaxonomy) {
        var catArr = [];
        wp.apiFetch({ path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(function (posts) {
          var post = posts.map(function (post, key) {
            catArr.push({
              label: __(post.name),
              value: __(post.value)
            });
          });

          _this30.setState({ checkboxCat: true });
          _this30.props.setAttributes({ categoryList: catArr, postTaxonomy: postTaxonomy });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this31 = this;

      var _props21 = this.props,
          _props21$attributes = _props21.attributes,
          postType = _props21$attributes.postType,
          catId = _props21$attributes.catId,
          taxonomyList = _props21$attributes.taxonomyList,
          postTaxonomy = _props21$attributes.postTaxonomy,
          categoryList = _props21$attributes.categoryList,
          postPerPage = _props21$attributes.postPerPage,
          setAttributes = _props21.setAttributes;

      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Post Type Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Post Type',
              value: postType,
              onChange: this.onTaxonomySelect,
              options: this.state.options
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Taxonomy',
              value: postTaxonomy,
              onChange: this.onCategorySelect,
              options: this.state.taxonomyList
            }),
            postTaxonomy && categoryList.map(function (item, key) {
              return wp.element.createElement(CheckboxControl, {
                label: item.label,
                value: item.value,
                checked: -1 < catId.indexOf(item.value),
                onChange: function onChange(e) {
                  return _this31.onCatSelect(e, item.value);
                }
              });
            }),
            wp.element.createElement(TextControl, {
              label: 'Posts Per Page',
              type: 'number',
              value: postPerPage,
              min: '1',
              max: '100',
              step: '1',
              onChange: function onChange(value) {
                return setAttributes({ postPerPage: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, {
          block: 'select-post-list/category-blogs-block',
          attributes: { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId, 'postPerPage': postPerPage } })
      )];
    }
  }]);

  return categoryBlogsList;
}(Component);

  var searchBox = function (_Component10) {
  _inherits(searchBox, _Component10);

  function searchBox(props) {
    var _ref10;

    _classCallCheck(this, searchBox);

    var _this32 = _possibleConstructorReturn(this, (_ref10 = searchBox.__proto__ || Object.getPrototypeOf(searchBox)).call.apply(_ref10, [this].concat(_toConsumableArray(props))));

    _this32.state = {
      eduLevelOptions: [],
      specializationOptions: []
    };
    return _this32;
  }

  _createClass(searchBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props22 = this.props;

      _objectDestructuringEmpty(_props22.attributes);

      var setAttributes = _props22.setAttributes;

      var eduOptionsArr = [{ label: __('Select'), value: '' }];
      var specializationOptionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/edulevel/' }).then(function (posts) {
        posts.map(function (post, key) {
          if (posts.length == key + 1) {
            setAttributes({ isOptionsLoaded: true });
          }
          return eduOptionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
      });
      wp.apiFetch({ path: '/post_type/v1/specializations/' }).then(function (posts) {
        posts.map(function (post, key) {
          return specializationOptionsArr.push({
            label: __(post.value),
            value: __(post.name)
          });
        });
      });
      this.setState({ eduLevelOptions: eduOptionsArr });
      
      this.setState({ specializationOptions: specializationOptionsArr });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props23 = this.props,
          _props23$attributes = _props23.attributes,
          eduLevel = _props23$attributes.eduLevel,
          specialization = _props23$attributes.specialization,
          fbSpecialization = _props23$attributes.fbSpecialization,
          isOptionsLoaded = _props23$attributes.isOptionsLoaded,
          setAttributes = _props23.setAttributes;


      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Default Options Settings ') },
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Education Level',
              value: eduLevel,
              onChange: function onChange(value) {
                return setAttributes({ eduLevel: value });
              },
              options: this.state.eduLevelOptions
            }),
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Specialization',
              value: specialization,
              defaultValue: '',
              onChange: function onChange(value) {
                return setAttributes({ specialization: value });
              },
              options: this.state.specializationOptions
            }),
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Fallback Specialization',
              value: fbSpecialization,
              onChange: function onChange(value) {
                return setAttributes({ fbSpecialization: value });
              },
              options: this.state.specializationOptions
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, { block: 'nps-search-box/searchbox',
          attributes: { 'eduLevel': eduLevel, 'specialization': specialization, 'fbSpecialization': fbSpecialization } })
      )];
    }
  }]);

  return searchBox;
}(Component);

var horizontalSBox = function (_Component11) {
  _inherits(horizontalSBox, _Component11);

  function horizontalSBox(props) {
    var _ref11;

    _classCallCheck(this, horizontalSBox);

    var _this33 = _possibleConstructorReturn(this, (_ref11 = horizontalSBox.__proto__ || Object.getPrototypeOf(horizontalSBox)).call.apply(_ref11, [this].concat(_toConsumableArray(props))));

    _this33.state = {
      eduLevelOptions: [],
      specializationOptions: []
    };
    return _this33;
  }

  _createClass(horizontalSBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var eduOptionsArr = [{ label: __('Select'), value: '' }];
      var specializationOptionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/edulevel/' }).then(function (posts) {
        posts.map(function (post, key) {
          return eduOptionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
      });
      wp.apiFetch({ path: '/post_type/v1/specializations/' }).then(function (posts) {
        posts.map(function (post, key) {
          return specializationOptionsArr.push({
            label: __(post.value),
            value: __(post.name)
          });
        });
      });
      this.setState({ eduLevelOptions: eduOptionsArr });
      this.setState({ specializationOptions: specializationOptionsArr });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props24 = this.props,
          _props24$attributes = _props24.attributes,
          eduLevel = _props24$attributes.eduLevel,
          specialization = _props24$attributes.specialization,
          fbSpecialization = _props24$attributes.fbSpecialization,
          setAttributes = _props24.setAttributes;


      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Default Options Settings ') },
            wp.element.createElement(SelectControl, {
              label: 'Select Education Level',
              value: eduLevel,
              onChange: function onChange(value) {
                return setAttributes({ eduLevel: value });
              },
              options: this.state.eduLevelOptions
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Specialization',
              value: specialization,
              onChange: function onChange(value) {
                return setAttributes({ specialization: value });
              },
              options: this.state.specializationOptions
            }),
            wp.element.createElement(SelectControl, {
              label: 'Select Fallback Specialization',
              value: fbSpecialization,
              onChange: function onChange(value) {
                return setAttributes({ fbSpecialization: value });
              },
              options: this.state.specializationOptions
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, { block: 'cs-search-box/horizontal-searchbox',
          attributes: { 'eduLevel': eduLevel, 'specialization': specialization, 'fbSpecialization': fbSpecialization } })
      )];
    }
  }]);

  return horizontalSBox;
}(Component);

var placemantButton = function (_Component12) {
  _inherits(placemantButton, _Component12);

  function placemantButton(props) {
    var _ref12;

    _classCallCheck(this, placemantButton);

    var _this34 = _possibleConstructorReturn(this, (_ref12 = placemantButton.__proto__ || Object.getPrototypeOf(placemantButton)).call.apply(_ref12, [this].concat(_toConsumableArray(props))));

    _this34.state = {
      eduLevel: 'hs diploma',
      specialization: 'all_had',
      eduLevelOptions: [],
      specializationOptions: []
    };
    return _this34;
  }

  _createClass(placemantButton, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props25 = this.props,
          _props25$attributes = _props25.attributes,
          specialization = _props25$attributes.specialization,
          isOptionsLoaded = _props25$attributes.isOptionsLoaded,
          setAttributes = _props25.setAttributes;


      var eduOptionsArr = [{ label: __('Select'), value: '' }];
      var specializationOptionsArr = [{ label: __('Select'), value: '' }];
      wp.apiFetch({ path: '/post_type/v1/edulevel/' }).then(function (posts) {
        posts.map(function (post, key) {
          if (posts.length == key + 1) {
            setAttributes({ isOptionsLoaded: true });
          }
          return eduOptionsArr.push({
            label: __(post.name),
            value: __(post.value)
          });
        });
      });
      wp.apiFetch({ path: '/post_type/v1/specializations/' }).then(function (posts) {
        posts.map(function (post, key) {
          return specializationOptionsArr.push({
            label: __(post.value),
            value: __(post.name)
          });
        });
        function findOption(name) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = specializationOptionsArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var specializationOption = _step.value;

              if (specializationOption.value === name) {
                // case sensitive
                return specializationOption;
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return null;
        }

        var foundOption = findOption(specialization);

        if (foundOption == null) {
          setAttributes({ specialization: '' });
        }
      });
      this.setState({ eduLevelOptions: eduOptionsArr });
      
      this.setState({ specializationOptions: specializationOptionsArr });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props26 = this.props,
          _props26$attributes = _props26.attributes,
          eduLevel = _props26$attributes.eduLevel,
          specialization = _props26$attributes.specialization,
          fbSpecialization = _props26$attributes.fbSpecialization,
          btnText = _props26$attributes.btnText,
          linkText = _props26$attributes.linkText,
          isOptionsLoaded = _props26$attributes.isOptionsLoaded,
          setAttributes = _props26.setAttributes;


      return [wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(
          InspectorControls,
          null,
          wp.element.createElement(
            PanelBody,
            { title: __('Default Options Settings ') },
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Education Level',
              value: eduLevel,
              onChange: function onChange(value) {
                return setAttributes({ eduLevel: value });
              },
              options: this.state.eduLevelOptions
            }),
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Specialization',
              value: specialization,
              defaultValue: '',
              onChange: function onChange(value) {
                return setAttributes({ specialization: value });
              },
              options: this.state.specializationOptions
            }),
            isOptionsLoaded && wp.element.createElement(SelectControl, {
              label: 'Select Fallback Specialization',
              value: fbSpecialization,
              onChange: function onChange(value) {
                return setAttributes({ fbSpecialization: value });
              },
              options: this.state.specializationOptions
            }),
            wp.element.createElement(TextControl, {
              label: 'Button Text',
              type: 'string',
              value: btnText,
              onChange: function onChange(value) {
                return setAttributes({ btnText: value });
              }
            }),
            wp.element.createElement(TextControl, {
              label: 'Link Text',
              type: 'string',
              value: linkText,
              onChange: function onChange(value) {
                return setAttributes({ linkText: value });
              }
            })
          )
        )
      ), wp.element.createElement(
        Fragment,
        null,
        wp.element.createElement(ServerSideRender, { block: 'cs-placement-button/searchbox',
          attributes: { 'eduLevel': eduLevel, 'specialization': specialization, 'fbSpecialization': fbSpecialization, 'btnText': btnText, 'linkText': linkText, 'isOptionsLoaded': isOptionsLoaded } })
      )];
    }
  }]);

  return placemantButton;
}(Component);

module.exports = {
  postList: postList,
  allPostsList: allPostsList,
  latestSchools: latestSchools,
  categoryPostsList: categoryPostsList,
  categoryBlogsList: categoryBlogsList,
  categoryLicenseList: categoryLicenseList,
  careerLicenseList: careerLicenseList,
  categoryFaqPostsList: categoryFaqPostsList,
  relatedPosts: relatedPosts,
  searchBox: searchBox,
  horizontalSBox: horizontalSBox,
  placemantButton: placemantButton
};

/***/ })
/******/ ]);
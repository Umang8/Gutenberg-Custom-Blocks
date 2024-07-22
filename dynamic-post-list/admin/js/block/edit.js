
const { __ } = wp.i18n;
const {Fragment, Component} = wp.element;
const {InspectorControls} = wp.blockEditor;
const {serverSideRender: ServerSideRender} = wp;
const {SelectControl, CheckboxControl, RadioControl, PanelBody, TextControl, ToggleControl} = wp.components;

class postList extends Component{
    constructor(props) {
        super(...props);
        this.state = {
            checkboxPost: false,
            postType: '',
            options: [],
            checkList: []
        };
        this.onPostSelect = this.onPostSelect.bind(this);
        this.onTypeSelect = this.onTypeSelect.bind(this);
    }

    componentDidMount() {
        let pType = this.props.attributes.postType;
        this.onTypeSelect(pType);
        let optionsArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
            posts.map(function(post, key) {
                return optionsArr.push({
                    label: __(post.name),
                    value: __(post.value),
                });
            });
            this.setState({options: optionsArr});
        });
    }

    onTypeSelect(postType) {
        if (postType) {
            let postArr = [];
            wp.apiFetch({path: '/post_type/v1/post_list/?post_type=' + postType}).then(posts => {
                const post = posts.map(function (post, key) {
                    postArr.push({
                        label: __(post.name),
                        value: __(post.value),
                    });
                });
                this.setState({checkboxPost: true});
                this.props.setAttributes({checkList: postArr, postType: postType});
            });
        }
        this.setState({postType: ''});
        this.props.setAttributes({ postType: ''});
    }

    onPostSelect(e, value){
        const {attributes: {postId}, setAttributes} = this.props;
        let arr2 = [...postId];
        var index = arr2.indexOf(value);
        if (true === e) {
            arr2.push( value );
        } else {
            arr2.splice(index, 1);
        }
        setAttributes({ postId: arr2 });
    }
    render() {
        const { attributes: { postType, postId, checkList, postOrderBy, postOrder }, setAttributes } = this.props;
        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Post Type Settings ')}>
                    <SelectControl
                        label="Select Post type"
                        value={ postType }
                        onChange={ this.onTypeSelect }
                        options={ this.state.options }
                    />
                    {
                        ( postType && checkList ) && checkList.map((item, key) => {
                            return (
                                <CheckboxControl
                                    label={item.label}
                                    value={item.value}
                                    checked={-1 < postId.indexOf(item.value)}
                                    onChange={e => this.onPostSelect(e, item.value)}
                                />
                            );
                        })
                    }
                    </PanelBody>
                    <PanelBody title={__('Attributes Settings ')}>
                      { postType && (
                        <RadioControl
                          label="Order By"
                          help="Please select by which parameter you want to order"
                          selected={ postOrderBy }
                          options={ [
                            { label: 'Date', value: 'date' },
                            { label: 'Title', value: 'title' },
                            { label: 'Custom', value: 'custom' },
                          ] }
                          onChange={ value => setAttributes({postOrderBy: value}) }
                        />
                      )}
                      { postType && (
                        <RadioControl
                          label="Order"
                          help="Please select order"
                          selected={ postOrder }
                          options={ [
                            { label: 'Ascending', value: 'asc' },
                            { label: 'Descending', value: 'desc' },
                          ] }
                          onChange={ value => setAttributes({postOrder: value}) }
                        />
                      )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>,

            <Fragment>
                <ServerSideRender
                    block="select-post-list/post-list-block"
                    attributes={ { 'postId': postId, 'postType': postType, 'postOrderBy': postOrderBy, 'postOrder': postOrder } } />
            </Fragment>
        ];
    }
}

class allPostsList extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            postType: '',
        };
    }

    componentDidMount() {
        let optionsArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
            posts.map(function (post, key) {
                return optionsArr.push({
                    label: __(post.name),
                    value: __(post.value),
                });
            });
            this.setState({options: optionsArr});
        });
    }

    render() {
        const {attributes: {postType, postOrderBy, postOrder, postPerPage}, setAttributes} = this.props;
        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Post Type Settings ')}>
                    <SelectControl
                        label="Select Post Type"
                        value={ postType }
                        onChange={value => setAttributes({postType: value})}
                        options={this.state.options}
                    />
                      <TextControl
                        label="Posts Per Page"
                        type="number"
                        value={postPerPage}
                        min="1"
                        max="100"
                        step="1"
                        onChange={(value) => setAttributes({postPerPage: value})}
                      />
                    </PanelBody>
                    <PanelBody title={__('Attributes Settings ')}>
                    { postType && (
                        <RadioControl
                            label="Order By"
                            help="Please select by which parameter you want to order"
                            selected={ postOrderBy }
                            options={ [
                                { label: 'Date', value: 'date' },
                                { label: 'Title', value: 'title' }
                            ] }
                            onChange={ value => setAttributes({postOrderBy: value}) }
                        />
                    )}
                    { postType && (
                        <RadioControl
                            label="Order"
                            help="Please select order"
                            selected={ postOrder }
                            options={ [
                                { label: 'Ascending', value: 'asc' },
                                { label: 'Descending', value: 'desc' },
                            ] }
                            onChange={ value => setAttributes({postOrder: value}) }
                        />
                    )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>,
            <Fragment>
                <ServerSideRender
                    block="select-post-list/all-posts-block"
                    attributes={ { 'postType': postType, 'postOrderBy': postOrderBy, 'postOrder': postOrder, 'postPerPage': postPerPage } } />

            </Fragment>
        ];
    }
}

class latestSchools extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      postType: '',
    };
  }
  componentDidMount() {
    let optionsArr = [{label: __('Select'), value: ''}];
    wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
      posts.map(function (post, key) {
        return optionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
      this.setState({options: optionsArr});
    });
  }
  render() {
    const { attributes, setAttributes } = this.props;
    const { postType } = attributes;
    return [
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Post Type Settings ')}>
            <SelectControl
              label="Select Post Type"
              value={ postType }
              help="Select Post Type which contains A to Z alphabetic meta value"
              onChange={value => setAttributes({postType: value})}
              options={this.state.options}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>,
      <Fragment>
        <ServerSideRender block="nps-post-list/latest-schools-list"
                          attributes={ { 'postType': postType } }/>
      </Fragment>
    ];
  }
}

class categoryPostsList extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      checkboxCat: false,
      postType: '',
      taxonomyList: [],
      categoryList: [],
      postTaxonomy: ''
    };
    this.onTaxonomySelect = this.onTaxonomySelect.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  componentDidMount() {
    const {attributes: {postType, postTaxonomy, catId}, setAttributes} = this.props;
    let optionsArr = [{label: __('Select'), value: ''}];
    wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
      posts.map(function (post, key) {
        return optionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
      this.setState({options: optionsArr});
    });
    this.onTaxonomySelect( postType );
    this.onCategorySelect( postTaxonomy );
  }

  onCatSelect(e, value){
    const {attributes: {catId}, setAttributes} = this.props;
    let arr2 = [...catId];
    var index = arr2.indexOf(value);
    if (true === e) {
      arr2.push( value );
    } else {
      arr2.splice(index, 1);
    }
    setAttributes({ catId: arr2 });
  }
  onTaxonomySelect(postType) {
    const {attributes: {postTaxonomy}, setAttributes} = this.props;
    if (postType) {
      let taxArr = [{label: __('Select'), value: ''}];
      wp.apiFetch({path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(posts => {
        const post = posts.map(function (post, key) {
          taxArr.push({
            label: __(post.name),
            value: __(post.value),
          });
        });

        this.setState({taxonomyList: taxArr});
        setAttributes({taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy});
      });
    }
  }

  onCategorySelect(postTaxonomy) {
    if (postTaxonomy) {
      let catArr = [];
      wp.apiFetch({path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(posts => {
        const post = posts.map(function (post, key) {
          catArr.push({
            label: __(post.name),
            value: __(post.value),
          });
        });

        this.setState({checkboxCat: true});
        this.props.setAttributes({categoryList: catArr, postTaxonomy: postTaxonomy});
      });
    }
  }

  render() {
    const {attributes: {postType, catId, taxonomyList, postTaxonomy, categoryList}, setAttributes} = this.props;
    return [
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Post Type Settings ')}>
            <SelectControl
              label="Select Post Type"
              value={ postType }
              onChange={this.onTaxonomySelect}
              options={this.state.options}
            />
            <SelectControl
              label="Select Taxonomy"
              value={ postTaxonomy }
              onChange={this.onCategorySelect}
              options={this.state.taxonomyList}
            />
            {
              ( postTaxonomy ) && categoryList.map((item, key) => {
                return (
                  <CheckboxControl
                    label={item.label}
                    value={item.value}
                    checked={-1 < catId.indexOf(item.value)}
                    onChange={e => this.onCatSelect(e, item.value)}
                  />
                );
              })
            }

          </PanelBody>
        </InspectorControls>
      </Fragment>,
      <Fragment>
        <ServerSideRender
          block="select-post-list/category-posts-block"
          attributes={ { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId } } />

      </Fragment>
    ];
  }
}

class categoryFaqPostsList extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            checkboxCat: false,
            postType: '',
            taxonomyList: [],
            categoryList: [],
            postTaxonomy: ''
        };
        this.onTaxonomySelect = this.onTaxonomySelect.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        const {attributes: {postType, postTaxonomy, catId}, setAttributes} = this.props;
        let optionsArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
            posts.map(function (post, key) {
                return optionsArr.push({
                    label: __(post.name),
                    value: __(post.value),
                });
            });
            this.setState({options: optionsArr});
        });
        this.onTaxonomySelect( postType );
        this.onCategorySelect( postTaxonomy );
    }

    onCatSelect(e, value){
        const {attributes: {catId}, setAttributes} = this.props;
        let arr2 = [...catId];
        var index = arr2.indexOf(value);
        if (true === e) {
            arr2.push( value );
        } else {
            arr2.splice(index, 1);
        }
        setAttributes({ catId: arr2 });
    }
    onTaxonomySelect(postType) {
        const {attributes: {postTaxonomy}, setAttributes} = this.props;
        if (postType) {
            let taxArr = [{label: __('Select'), value: ''}];
            wp.apiFetch({path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(posts => {
                const post = posts.map(function (post, key) {
                    taxArr.push({
                        label: __(post.name),
                        value: __(post.value),
                    });
                });

                this.setState({taxonomyList: taxArr});
                setAttributes({taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy});
            });
        }
    }

    onCategorySelect(postTaxonomy) {
        if (postTaxonomy) {
            let catArr = [];
            wp.apiFetch({path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(posts => {
                const post = posts.map(function (post, key) {
                    catArr.push({
                        label: __(post.name),
                        value: __(post.value),
                    });
                });

                this.setState({checkboxCat: true});
                this.props.setAttributes({categoryList: catArr, postTaxonomy: postTaxonomy});
            });
        }
    }

    render() {
        const {attributes: {postType, catId, taxonomyList, postTaxonomy, categoryList, faqOrderBy, faqOrder}, setAttributes} = this.props;
        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Post Type Settings ')}>
                        <SelectControl
                            label="Select Post Type"
                            value={ postType }
                            onChange={this.onTaxonomySelect}
                            options={this.state.options}
                        />
                        <SelectControl
                            label="Select Taxonomy"
                            value={ postTaxonomy }
                            onChange={this.onCategorySelect}
                            options={this.state.taxonomyList}
                        />
                        {
                            ( postTaxonomy ) && categoryList.map((item, key) => {
                                return (
                                    <CheckboxControl
                                        label={item.label}
                                        value={item.value}
                                        checked={-1 < catId.indexOf(item.value)}
                                        onChange={e => this.onCatSelect(e, item.value)}
                                    />
                                );
                            })
                        }

                    </PanelBody>
                    <PanelBody title={__('Attributes Settings ')}>
                    { postType && (
                        <RadioControl
                            label="Order By"
                            help="Please select by which parameter you want to order"
                            selected={ faqOrderBy }
                            options={ [
                                { label: 'Date', value: 'date' },
                                { label: 'Title', value: 'title' },
                                { label: 'Custom', value: 'custom' }
                            ] }
                            onChange={ value => setAttributes({faqOrderBy: value}) }
                        />
                    )}
                    { postType && (
                        <RadioControl
                            label="Order"
                            help="Please select order"
                            selected={ faqOrder }
                            options={ [
                                { label: 'Ascending', value: 'asc' },
                                { label: 'Descending', value: 'desc' }
                            ] }
                            onChange={ value => setAttributes({faqOrder: value}) }
                        />
                    )}
                    </PanelBody>
                </InspectorControls>
            </Fragment>,
            <Fragment>
                <ServerSideRender
                    block="select-post-list/faq-block"
                    attributes={ { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId, 'faqOrderBy': faqOrderBy, 'faqOrder': faqOrder } } />

            </Fragment>
        ];
    }
}

class categoryLicenseList extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            postId: '',
            categoryList: [],
            postLists: [],
        }
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        const {attributes: { postTaxonomy, postCategory }, setAttributes} = this.props;
        let catArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/post_category/?post_taxonomy=license_type'}).then(posts => {
            const post = posts.map(function (post, key) {
                catArr.push({
                    label: __(post.name),
                    value: __(post.value),
                });
            });
            this.setState({categoryList: catArr});
            this.props.setAttributes({categoryList: catArr, postTaxonomy: postTaxonomy});
        });
        this.onCategorySelect( postCategory );
    }

    onCategorySelect(postCategory) {
        if (postCategory) {
            let postArr = [{label: __('Select'), value: ''}];
            wp.apiFetch({path: '/post_type/v1/post_term/?term_id=' + postCategory }).then(posts => {
                const post = posts.map(function (post, key) {
                    postArr.push({
                        label: __(post.title),
                        value: __(post.id),
                    });
                });
                this.setState({postLists: postArr});
                this.props.setAttributes({postLists: postArr, postCategory: postCategory});
            });
        }
    }

    render() {
        const {attributes: { categoryList, postLists, postCategory, postId}, setAttributes} = this.props;
        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('License List Settings ')}>
                        <SelectControl
                            label="Select Category"
                            value={ postCategory }
                            onChange={ this.onCategorySelect }
                            options={ this.state.categoryList }
                        />
                        <SelectControl
                            label="Select Post"
                            value={ postId }
                            onChange={value => setAttributes({postId: value})}
                            options={ this.state.postLists }
                        />

                    </PanelBody>
                </InspectorControls>
            </Fragment>,
            <Fragment>
                <ServerSideRender
                    block="select-post-list/license-block"
                    attributes={ { 'categoryList': categoryList, 'postLists': postLists, 'postCategory': postCategory, 'postId': postId } } />

            </Fragment>
        ];
    }
}

class careerLicenseList extends Component {
    constructor(props) {
        super(...props);
        this.state = {
            categoryList: [],
            postLists: [],
        }
        this.onCategorySelect = this.onCategorySelect.bind(this);
    }

    componentDidMount() {
        const {attributes: { postTaxonomy, postCategory }, setAttributes} = this.props;
        let catArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/post_category/?post_taxonomy=license_type'}).then(posts => {
            const post = posts.map(function (post, key) {
                catArr.push({
                    label: __(post.name),
                    value: __(post.value),
                });
            });
            this.setState({categoryList: catArr});
            this.props.setAttributes({categoryList: catArr, postTaxonomy: postTaxonomy});
        });
        this.onCategorySelect( postCategory );
    }

    onCategorySelect(postCategory) {
        if (postCategory) {
            let postArr = [{label: __('Select'), value: ''}];
            wp.apiFetch({path: '/post_type/v1/post_term/?term_id=' + postCategory }).then(posts => {
                const post = posts.map(function (post, key) {
                    postArr.push({
                        label: __(post.title),
                        value: __(post.id),
                    });
                });
                this.setState({postLists: postArr});
                this.props.setAttributes({postLists: postArr, postCategory: postCategory});
            });
        }
    }

    render() {
        const {attributes: { categoryList, postCategory}, setAttributes} = this.props;
        return [
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('License List Settings ')}>
                        <SelectControl
                            label="Select Category"
                            value={ postCategory }
                            onChange={ this.onCategorySelect }
                            options={ this.state.categoryList }
                        />

                    </PanelBody>
                </InspectorControls>
            </Fragment>,
            <Fragment>
                <ServerSideRender
                    block="select-post-list/license-career-block"
                    attributes={ { 'categoryList': categoryList, 'postCategory': postCategory } } />

            </Fragment>
        ];
    }
}

class relatedPosts extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      postType: ''
    };
  }
  componentDidMount() {
    let optionsArr = [{label: __('Select'), value: ''}];
    wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
      posts.map(function (post, key) {
        return optionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
      this.setState({options: optionsArr});
    });
  }
  render() {
    const { attributes, setAttributes } = this.props;
    const { displayRelPrograms, programsTitle, careersTitle, displayRelBlogs, displayRelCareers, postType, postTypeBlog, postTypeCareers, excludeSelfPost, blogsTitle, excludeSelfBlog, excludeSelfCareers, displayLinks, displayLinksBlog, displayLinksCareers, pullPostsBy, pullBlogsBy, pullCareersBy } = attributes;
    return [
      <Fragment>
        <InspectorControls>
        <PanelBody title={__('Related Careers Settings ')}>
            <ToggleControl
              label="Display Related Careers"
              checked={displayRelCareers}
              onChange={value => setAttributes({displayRelCareers: value})}
            />
            <TextControl
              label="Careers Block Title"
              type="string"
              value={careersTitle}
              onChange={(value) => setAttributes({careersTitle: value})}
            />
            <SelectControl
              label="Select Post Type"
              value={ postTypeCareers }
              help="Select Post Type for related Careers"
              onChange={value => setAttributes({postTypeCareers: value})}
              options={this.state.options}
            />
            <ToggleControl
              label="Exclude Self"
              checked={excludeSelfCareers}
              onChange={value => setAttributes({excludeSelfCareers: value})}
            />
            <SelectControl
              label="Pull By Tags"
              value={ pullCareersBy }
              options={[
                {label: __('Primary'), value: 'primary'},
                {label: __('Both'), value: 'both'},
              ]}
              help="Select You want posts by Primary only or both"
              onChange={(value) => setAttributes({pullCareersBy: value})}
            />
            <SelectControl
              label={__('Links to Display')}
              value={displayLinksCareers}
              options={[
                {label: __('Default'), value: '7'},
                {label: __('3'), value: '3'},
                {label: __('5'), value: '5'},
                {label: __('10'), value: '10'},
                {label: __('All'), value: 'all'},
              ]}
              onChange={(value) => setAttributes({displayLinksCareers: value})}
            />
          </PanelBody>
          <PanelBody title={__('Related Programs Settings ')}>
            <ToggleControl
              label="Display Related Programs"
              checked={displayRelPrograms}
              onChange={value => setAttributes({displayRelPrograms: value})}
            />
            <TextControl
              label="Programs Block Title"
              type="string"
              value={programsTitle}
              onChange={(value) => setAttributes({programsTitle: value})}
            />
            <SelectControl
              label="Select Post Type"
              value={ postType }
              help="Select Post Type for related posts"
              onChange={value => setAttributes({postType: value})}
              options={this.state.options}
            />
            <ToggleControl
              label="Exclude Self"
              checked={excludeSelfPost}
              onChange={value => setAttributes({excludeSelfPost: value})}
            />
            <SelectControl
              label="Pull By Tags"
              value={ pullPostsBy }
              options={[
                {label: __('Primary'), value: 'primary'},
                {label: __('Both'), value: 'both'},
              ]}
              help="Select You want posts by Primary only or both"
              onChange={(value) => setAttributes({pullPostsBy: value})}
            />
            <SelectControl
              label={__('Links to Display')}
              value={displayLinks}
              options={[
                {label: __('Default'), value: '7'},
                {label: __('3'), value: '3'},
                {label: __('5'), value: '5'},
                {label: __('10'), value: '10'},
                {label: __('All'), value: 'all'},
              ]}
              onChange={(value) => setAttributes({displayLinks: value})}
            />
          </PanelBody>
          <PanelBody title={__('Related Blog Settings ')}>
            <ToggleControl
              label="Display Related Blogs"
              checked={displayRelBlogs}
              onChange={value => setAttributes({displayRelBlogs: value})}
            />
            <TextControl
              label="Blogs Block Title"
              type="string"
              value={blogsTitle}
              onChange={(value) => setAttributes({blogsTitle: value})}
            />
            <SelectControl
              label="Select Blog Post Type"
              value={ postTypeBlog }
              help="Select Post Type for Blog related posts"
              onChange={value => setAttributes({postTypeBlog: value})}
              options={this.state.options}
            />
            <ToggleControl
              label="Exclude Self"
              checked={excludeSelfBlog}
              onChange={value => setAttributes({excludeSelfBlog: value})}
            />
            <SelectControl
              label={__('Links to Display')}
              value={displayLinksBlog}
              options={[
                {label: __('Default'), value: '7'},
                {label: __('3'), value: '3'},
                {label: __('5'), value: '5'},
                {label: __('10'), value: '10'},
                {label: __('All'), value: 'all' },
              ]}
              onChange={(value) => setAttributes({displayLinksBlog: value})}
            />
            <SelectControl
              label={__('Pull By Tags')}
              value={ pullBlogsBy }
              options={[
                {label: __('Primary'), value: 'primary'},
                {label: __('Both'), value: 'both'},
              ]}
              help="Select You want posts by Primary only or both"
              onChange={(value) => setAttributes({pullBlogsBy: value})}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>,
      <Fragment>
        <ServerSideRender block="related-post-section/related-posts"
                          attributes={ { 'displayRelPrograms': displayRelPrograms, 'displayRelCareers': displayRelCareers, 'blogsTitle': blogsTitle, 'careersTitle': careersTitle, 'postType': postType, 'excludeSelfPost': excludeSelfPost, 'displayLinks': displayLinks,
                            'postTypeBlog': postTypeBlog, 'postTypeCareers': postTypeCareers, 'displayRelBlogs': displayRelBlogs, 'programsTitle': programsTitle, 'excludeSelfBlog': excludeSelfBlog, 'excludeSelfCareers': excludeSelfCareers, 'displayLinksBlog': displayLinksBlog, 'displayLinksCareers': displayLinksCareers,
                            'pullBlogsBy': pullBlogsBy, 'pullPostsBy': pullPostsBy, 'pullCareersBy': pullCareersBy } }/>
      </Fragment>
    ];
  }
}

class categoryBlogsList extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      checkboxCat: false,
      postType: '',
      taxonomyList: [],
      categoryList: [],
      postTaxonomy: ''
    };
    this.onTaxonomySelect = this.onTaxonomySelect.bind(this);
    this.onCategorySelect = this.onCategorySelect.bind(this);
  }

  componentDidMount() {
    const {attributes: {postType, postTaxonomy, catId}, setAttributes} = this.props;
    let optionsArr = [{label: __('Select'), value: ''}];
    wp.apiFetch({path: '/post_type/v1/post_data/'}).then(posts => {
      posts.map(function (post, key) {
        return optionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
      this.setState({options: optionsArr});
    });
    this.onTaxonomySelect( postType );
    this.onCategorySelect( postTaxonomy );
  }

  onCatSelect(e, value){
    const {attributes: {catId}, setAttributes} = this.props;
    let arr2 = [...catId];
    var index = arr2.indexOf(value);
    if (true === e) {
      arr2.push( value );
    } else {
      arr2.splice(index, 1);
    }
    setAttributes({ catId: arr2 });
  }
  onTaxonomySelect(postType) {
    const {attributes: {postTaxonomy}, setAttributes} = this.props;
    if (postType) {
      let taxArr = [{label: __('Select'), value: ''}];
      wp.apiFetch({path: '/post_type/v1/post_taxonomies/?post_type=' + postType }).then(posts => {
        const post = posts.map(function (post, key) {
          taxArr.push({
            label: __(post.name),
            value: __(post.value),
          });
        });

        this.setState({taxonomyList: taxArr});
        setAttributes({taxonomyList: taxArr, postType: postType, postTaxonomy: postTaxonomy});
      });
    }
  }

  onCategorySelect(postTaxonomy) {
    if (postTaxonomy) {
      let catArr = [];
      wp.apiFetch({path: '/post_type/v1/post_category/?post_taxonomy=' + postTaxonomy }).then(posts => {
        const post = posts.map(function (post, key) {
          catArr.push({
            label: __(post.name),
            value: __(post.value),
          });
        });

        this.setState({checkboxCat: true});
        this.props.setAttributes({categoryList: catArr, postTaxonomy: postTaxonomy});
      });
    }
  }

  render() {
    const {attributes: {postType, catId, taxonomyList, postTaxonomy, categoryList, postPerPage}, setAttributes} = this.props;
    return [
      <Fragment>
        <InspectorControls>
          <PanelBody title={__('Post Type Settings ')}>
            <SelectControl
              label="Select Post Type"
              value={ postType }
              onChange={this.onTaxonomySelect}
              options={this.state.options}
            />
            <SelectControl
              label="Select Taxonomy"
              value={ postTaxonomy }
              onChange={this.onCategorySelect}
              options={this.state.taxonomyList}
            />
            {
              ( postTaxonomy ) && categoryList.map((item, key) => {
                return (
                  <CheckboxControl
                    label={item.label}
                    value={item.value}
                    checked={-1 < catId.indexOf(item.value)}
                    onChange={e => this.onCatSelect(e, item.value)}
                  />
                );
              })
            }
            <TextControl
              label="Posts Per Page"
              type="number"
              value={postPerPage}
              min="1"
              max="100"
              step="1"
              onChange={(value) => setAttributes({postPerPage: value})}
            />

          </PanelBody>
        </InspectorControls>
      </Fragment>,
      <Fragment>
        <ServerSideRender
          block="select-post-list/category-blogs-block"
          attributes={ { 'postType': postType, 'categoryList': categoryList, 'taxonomyList': taxonomyList, 'postTaxonomy': postTaxonomy, 'catId': catId, 'postPerPage': postPerPage } } />

      </Fragment>
    ];
  }
}

class searchBox extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      eduLevelOptions: [],
      specializationOptions: []
    };
  }
  componentDidMount() {
    const { attributes: { }, setAttributes } = this.props;
    let eduOptionsArr = [{label: __('Select'), value: ''}];
    let specializationOptionsArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/edulevel/'}).then(posts => {
      posts.map(function(post, key) {
        if (posts.length == key + 1) {
          setAttributes({ isOptionsLoaded: true });
        }
        return eduOptionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
    });
    wp.apiFetch({path: '/post_type/v1/specializations/'}).then(posts => {
      posts.map(function(post, key) {
        return specializationOptionsArr.push({
          label: __(post.value),
          value: __(post.name),
        });
      });
    });
    this.setState({eduLevelOptions: eduOptionsArr});
    if(this.state.eduLevelOptions != undefined){
      setAttributes({eduLevel: 'hs diploma'});
    }
    this.setState({specializationOptions: specializationOptionsArr});
  };

  render() {
    const { attributes: { eduLevel, specialization, fbSpecialization, isOptionsLoaded }, setAttributes } = this.props;
    
    return [
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Default Options Settings ')}>
        {isOptionsLoaded &&
        <SelectControl
          label="Select Education Level"
          value={ eduLevel }
          onChange={value => setAttributes({eduLevel: value})}
          options={this.state.eduLevelOptions}
        />
        }
        {isOptionsLoaded &&
        <SelectControl
          label="Select Specialization"
          value={ specialization }
          defaultValue={''}
          onChange={value => setAttributes({specialization: value})}
          options={this.state.specializationOptions}
        />
        }
        {isOptionsLoaded &&
        <SelectControl
          label="Select Fallback Specialization"
          value={ fbSpecialization }
          onChange={value => setAttributes({fbSpecialization: value})}
          options={this.state.specializationOptions}
        />
        }
        </PanelBody>
      </InspectorControls>
    </Fragment>,
    <Fragment>
      <ServerSideRender block="nps-search-box/searchbox" 
      attributes={{ 'eduLevel': eduLevel, 'specialization': specialization, 'fbSpecialization': fbSpecialization }} />
    </Fragment>
    ];
  }
}

class horizontalSBox extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      eduLevelOptions: [],
      specializationOptions: []
    };
  }
  componentDidMount() {
    let eduOptionsArr = [{label: __('Select'), value: ''}];
    let specializationOptionsArr = [{label: __('Select'), value: ''}];
      wp.apiFetch({path: '/post_type/v1/edulevel/'}).then(posts => {
      posts.map(function(post, key) {
        return eduOptionsArr.push({
          label: __(post.name),
          value: __(post.value),
        });
      });
    });
    wp.apiFetch({path: '/post_type/v1/specializations/'}).then(posts => {
      posts.map(function(post, key) {
        return specializationOptionsArr.push({
          label: __(post.value),
          value: __(post.name),
        });
      });
    });
          this.setState({eduLevelOptions: eduOptionsArr});
    this.setState({specializationOptions: specializationOptionsArr});
  };

  render() {
    const { attributes: { eduLevel, specialization }, setAttributes } = this.props;
    
    return [
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Default Options Settings ')}>
        <SelectControl
          label="Select Education Level"
          value={ eduLevel }
          onChange={value => setAttributes({eduLevel: value})}
          options={this.state.eduLevelOptions}
        />
        <SelectControl
          label="Select Specialization"
          value={ specialization }
          onChange={value => setAttributes({specialization: value})}
          options={this.state.specializationOptions}
        />
        </PanelBody>
      </InspectorControls>
    </Fragment>,
    <Fragment>
      <ServerSideRender block="cs-search-box/horizontal-searchbox" 
      attributes={{ 'eduLevel': eduLevel, 'specialization': specialization}} />
    </Fragment>
    ];
  }
}

class placemantButton extends Component {
  constructor(props) {
    super(...props);
    this.state = {
      eduLevel: 'hs diploma',
      specialization: 'all_had',
      eduLevelOptions: [],
      specializationOptions: []
    };
  }
  componentDidMount() {
    const { attributes: { specialization, isOptionsLoaded }, setAttributes } = this.props;

    let eduOptionsArr = [{label: __('Select'), value: ''}];
    let specializationOptionsArr = [{label: __('Select'), value: ''}];
        wp.apiFetch({path: '/post_type/v1/edulevel/'}).then(posts => {
        posts.map(function(post, key) {
          if (posts.length == key + 1) {
                        setAttributes({ isOptionsLoaded: true });
                    }
          return eduOptionsArr.push({
            label: __(post.name),
            value: __(post.value),
          });
        });
    });
    wp.apiFetch({path: '/post_type/v1/specializations/'}).then(posts => {
      posts.map(function(post, key) {
        return specializationOptionsArr.push({
          label: __(post.value),
          value: __(post.name),
        });
      });
      function findOption(name) {
        for (let specializationOption of specializationOptionsArr) {
          if (specializationOption.value === name) { // case sensitive
          return specializationOption
          }
        }
        return null
      }
      
      let foundOption = findOption(specialization);

      if(foundOption == null){
        setAttributes({specialization: ''});
      }
    });
          this.setState({eduLevelOptions: eduOptionsArr});
    if(this.state.eduLevelOptions != undefined){
      setAttributes({eduLevel: 'hs diploma'});
    }
    this.setState({specializationOptions: specializationOptionsArr});
      };

  render() {
    const { attributes: { eduLevel, specialization, fbSpecialization, btnText, linkText, isOptionsLoaded }, setAttributes } = this.props;
    
    return [
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Default Options Settings ')}>
        {isOptionsLoaded &&
        <SelectControl
          label="Select Education Level"
          value={ eduLevel }
          onChange={value => setAttributes({eduLevel: value})}
          options={this.state.eduLevelOptions}
        />
        }
        {isOptionsLoaded &&
        <SelectControl
          label="Select Specialization"
          value={ specialization }
          defaultValue={''}
          onChange={value => setAttributes({specialization: value})}
          options={this.state.specializationOptions}
        />
        }
        {isOptionsLoaded &&
        <SelectControl
          label="Select Fallback Specialization"
          value={ fbSpecialization }
          onChange={value => setAttributes({fbSpecialization: value})}
          options={this.state.specializationOptions}
        />
        }
        <TextControl
          label="Button Text"
          type="string"
          value={btnText}
          onChange={(value) => setAttributes({btnText: value})}
        />
        <TextControl
          label="Link Text"
          type="string"
          value={linkText}
          onChange={(value) => setAttributes({linkText: value})}
        />
        </PanelBody>
      </InspectorControls>
    </Fragment>,
    <Fragment>
      <ServerSideRender block="cs-placement-button/searchbox" 
      attributes={{ 'eduLevel': eduLevel, 'specialization': specialization, 'fbSpecialization': fbSpecialization, 'btnText': btnText, 'linkText': linkText, 'isOptionsLoaded': isOptionsLoaded }} />
    </Fragment>
    ];
  }
}

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
    placemantButton: placemantButton,
};

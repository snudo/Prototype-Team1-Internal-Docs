const ITEMS = {
    first: 0,
    second: 1
};

const SCROLL_POSITION = {
    top: 0
};

const ANIMATION_TIME = {
    hide: 200
};

const FILTER_TYPE = {
    all: 0,
    starred: 1,
    private: 2,
    public: 3,
    archived: 4
}

const IS_PRIVATE = {
    no: false,
    yes: true
}

const MOBILE_COMMENT_ACTION_TYPES = {
    create_comment: 1,
    create_reply: 2,
    edit_comment: 3,
    edit_reply: 4
}

const TIMEOUT_SPEED = {
    slow: 1000,
    normal: 500,
    fast: 380,
    fastest: 150
}

const ITEM_RANDOM_ID = {
    random_tab_id: "random_id" + (Math.random() + 1).toString(36).substring(5),
    random_component_id: (Math.random() + 1).toString(36).substring(7)
}
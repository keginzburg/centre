const initialState = {}

const usersReducer = (state = initialState, action) => {
    Object.freeze(state);
    // let nextState = {...state};

    switch (action.type) {
        default:
            return state;
    }
}

export default usersReducer;
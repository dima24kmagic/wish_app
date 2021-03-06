import moment from "moment";
import { uniqueID } from "../../services/api.utils";
import { animations } from "../../services/api.animate";

const initialState = {
  [uniqueID()]: {
    wishText: "Live in Hawaii",
    dateToAchieve: moment(),
    isEditing: false,
    isMenuOpen: false,
    stepsToAchieve: [{}],
    diary: {
      lastWrite: moment(),
      comments: ["start to work on my goals"]
    }
  },
  [uniqueID()]: {
    wishText: "Visit France",
    dateToAchieve: moment(),
    isEditing: false,
    isMenuOpen: false,
    stepsToAchieve: [{}],
    diary: {
      lastWrite: moment(),
      comments: ["start to work on my goals"]
    }
  }
};

export const OPEN_MENU = "wish/OPEN_MENU";
export const CLOSE_MENU = "wish/CLOSE_MENU";
export const EDIT_WISH = "wish/EDIT_WISH";
export const SAVE_EDITED_WISH = "wish/SAVE_EDITED_WISH";
export const REMOVE_WISH = "wish/REMOVE_WISH";
export const CLOSE_ALL_WISH_MENU = "wish/CLOSE_ALL_WISH_MENU";
export const ADD_NEW_WISH = "ADD_NEW_WISH";

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU: {
      let wishID = action.payload;
      let newState = {};
      Object.keys(state).forEach(v => {
        newState[v] = { ...state[v], isMenuOpen: false };
      });
      return { ...newState, [wishID]: { ...state[wishID], isMenuOpen: true } };
    }
    case CLOSE_MENU: {
      let wishID = action.payload;
      return {
        ...state,
        [wishID]: {
          ...state[wishID],
          isMenuOpen: false
        }
      };
    }
    case EDIT_WISH: {
      let wishID = action.payload;
      return {
        ...state,
        [wishID]: {
          ...state[wishID],
          isEditing: true,
          isMenuOpen: false
        }
      };
    }
    case SAVE_EDITED_WISH: {
      const wishID = action.payload.wishID;
      const newWishText = action.payload.wishData.wishText;
      const newdateToAchieve = action.payload.wishData.dateToAchieve;
      return {
        ...state,
        [wishID]: {
          ...state[wishID],
          wishText: newWishText,
          dateToAchieve: newdateToAchieve,
          isEditing: false,
          isMenuOpen: false
        }
      };
    }
    case REMOVE_WISH: {
      const wishID = action.payload;
      delete state[wishID];
      return {
        ...state
      };
    }
    case CLOSE_ALL_WISH_MENU: {
      let newState = {};
      Object.keys(state).forEach(v => {
        newState[v] = { ...state[v], isMenuOpen: false };
      });
      return newState;
    }
    case ADD_NEW_WISH: {
      const { wishText, dateToAchieve } = action.payload;
      return {
        ...state,
        [uniqueID()]: {
          wishText,
          dateToAchieve: dateToAchieve,
          isEditing: false,
          isMenuOpen: false,
          stepsToAchieve: [{}],
          diary: {
            lastWrite: moment(),
            comments: ["start to work on my goals"]
          }
        }
      };
    }
    default:
      return state;
  }
};

export const EditWishAndAnimate = wishID => {
  return dispatch => {
    dispatch({
      type: EDIT_WISH,
      payload: wishID
    });
    animations.AnimateAllMenusClose();
  };
};

export const SaveEditedWish = (wishID, wishData) => {
  return dispatch => {
    dispatch({
      type: SAVE_EDITED_WISH,
      payload: { wishID, wishData }
    });
    animations.AnimateAllMenusClose();
  };
};

export const OpenWishMenu = wishID => {
  return dispatch => {
    animations.AnimateAllMenusClose();
    dispatch({
      type: OPEN_MENU,
      payload: wishID
    });
  };
};

export const CloseMenuAndAnimate = (wishID, target) => {
  return dispatch => {
    dispatch({
      type: CLOSE_MENU,
      payload: wishID
    });
    animations.AnimateWishMenuOnClose(target);
  };
};

export const CloseAllWishMenuAndAnimate = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_ALL_WISH_MENU
    });
    animations.AnimateAllMenusClose();
  };
};

export const RemoveWish = wishID => {
  return dispatch => {
    dispatch({
      type: REMOVE_WISH,
      payload: wishID
    });
    animations.AnimateAllMenusClose();
  };
};

export const AddNewWish = wishData => {
  return dispatch => {
    dispatch({
      type: ADD_NEW_WISH,
      payload: wishData
    });
  };
};

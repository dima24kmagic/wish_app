import moment from "moment";
import { uniqueID } from "../../services/api.utils";
import {
  AnimateAllMenusClose,
  AnimateMenuOnClose,
  AnimateWishMenuOnOpen
} from "../../services/api.animate";

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

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MENU: {
      let wishID = action.payload;
      return { ...state, [wishID]: { ...state[wishID], isMenuOpen: true } };
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
      const newWishDate = action.payload.wishData.dateToAchieve;
      return {
        ...state,
        [wishID]: {
          ...state[wishID],
          wishText: newWishText,
          dateToAchieve: newWishDate,
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
  };
};

export const SaveEditedWish = (wishID, wishData) => {
  return dispatch => {
    dispatch({
      type: SAVE_EDITED_WISH,
      payload: { wishID, wishData }
    });
  };
};

export const OpenWishMenu = wishID => {
  return dispatch => {
    dispatch({
      type: OPEN_MENU,
      payload: wishID
    });
    AnimateWishMenuOnOpen();
  };
};

export const CloseMenuAndAnimate = (wishID, target) => {
  return dispatch => {
    dispatch({
      type: CLOSE_MENU,
      payload: wishID
    });
    AnimateMenuOnClose(target);
  };
};

export const CloseAllWishMenuAndAnimate = () => {
  return dispatch => {
    dispatch({
      type: CLOSE_ALL_WISH_MENU
    });
    AnimateAllMenusClose();
  };
};

export const RemoveWish = wishID => {
  return dispatch => {
    dispatch({
      type: REMOVE_WISH,
      payload: wishID
    });
  };
};

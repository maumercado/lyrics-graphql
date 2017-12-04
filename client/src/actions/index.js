import { CREATED_NEW_SONG } from "./types";

export const submitSongCreate = title => dispatch => {
    return { type: CREATED_NEW_SONG, payload: title };
};

const simpleResponse = (state, context) => ({ state, context });

const failed = 0;
const success = 1;
const error = 2;
const noTask = 3;
const forcedResetTask = 4;

export const Response = {
    failed: simpleResponse(failed, 'failed'),
    successful: simpleResponse(success, 'successful'),
    error: e => simpleResponse(error, `error occured. ${e}`),
    noTask: simpleResponse(noTask, 'There has no task'),
    forcedResetTask: simpleResponse(
        forcedResetTask,
        '해당 Task가 존재하지 않음. 초기화된것으로 보임',
    ),
};

export const nothing = null;

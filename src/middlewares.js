import routes from './routes';
import Task from './Models/Task';
import Tag from './Models/Tag';
import TagList from './Models/TagList';
import Post from './Models/Post';
import Girl from './Models/Girl';
import { Response } from './jsons';

export const DPrint = text => {
    if (process.env.NODE_ENV === 'development') console.log(text);
};

// crawler가 받아갈때 task에 있던 내용을 항상 삭제
export const checkCrawler = async (req, res, next) => {
    const { crawler } = req.query;
    const task = await Task.find({ crawler });
    DPrint(task.length);

    if (!task.length) next();
    else res.send(Response.error('you have another task'));
};

// 1 day = 24 * 60 * 60 * 1000
export const Routine = (callback, time) => {
    callback();
    setTimeout(Routine, time);
};

// tagList
export const updateTagList = async () => {
    DPrint('updateTagList Start');
    try {
        const tags = await Tag.find({});
        for (let i = 0; i < tags.length; i++) {
            const postsList = [];
            const girls = await Girl.find({ tags: tags[i] });
            for (let j = 0; j < girls.length; j++) {
                const posts = await Post.find({
                    girl: girls[j],
                    isImage: true
                });
                postsList = postsList.concat(posts);
            }
            // 셔플
            postsList = shuffleArray(postsList);
            // tagList 업데이트
            let tagList = await TagList.findOne({ tag: tags[i] });
            if (tagList) {
                await TagList.findByIdAndUpdate(tagList, { posts: postsList });
            } else {
                tagList = new TagList({ tag: tags[i], posts: postsList });
                tagList.save();
            }
        }
    } catch (e) {
        console.log(e);
    }
    DPrint('updateTagList Ended');
};

// array 랜덤 셔플
export const shuffleArray = array => {
    var m = array.length,
        t,
        i;

    while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
};

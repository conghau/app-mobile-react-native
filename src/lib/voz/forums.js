import {GET} from './http';
import cheerio from 'cheerio-without-node-native';
const FORUM_URL = 'https://vozforums.com';

const SUB_FORUM = [
    {
        title: 'Download',
        id: 14,
        href: 'forumdisplay.php?f=14'
    },
    {
        title: 'Phát triển Phần mềm',
        id: 148,
        href: 'forumdisplay.php?f=148'
    }
];

const HIDDEN_FORUMS = [
    {
        title: 'Điểm báo',
        id: 33,
        href: 'forumdisplay.php?f=33'
    }
];

export function parseForums(response) {
    const forumLinks = cheerio('tbody[id^="collapseobj_forumbit"] tr td.alt1Active div a', response);
    const forums = [];
    forumLinks.each((idx, link) => {
        const href = link.attribs.href;
        const id = parseInt(href.replace('forumdisplay.php?f=', ''));
        const title = cheerio(link).text();
        forums.push({href, title, id})
    });
    return forums;
}

export async function getForumList() {
    try {
        const response = await GET(FORUM_URL);
        return parseForums(response).concat(HIDDEN_FORUMS, SUB_FORUM);
    } catch (error) {
        console.log({
            message: 'Can not get forum list!',
            error: error.toString(),
        });
        return [];
    }
}

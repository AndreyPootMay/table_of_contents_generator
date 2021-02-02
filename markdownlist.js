const fs = require('fs');

async function print(path) {
    const dir = await fs.promises.opendir(path);
    let lessons = [];
    for await (const dirent of dir) {
        const non_folders = ['.git', 'markdownlist.js', 'README.md'];
        if (!non_folders.includes(dirent.name)) {
            let lessonName = formatLessonName(dirent.name);
            lessons.push(lessonName);
            lessons.sort();
        }
    }

    writeReadMeTable(lessons);
}

let formatLessonName = lessonName => {
    let words = lessonName.split('_');
    let lessonNumber = words[0];
    let capitalizeLesson = '';
    words.shift();

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        capitalizeLesson += words[i];
    }

    lessonNameFormatted = `\n| ${lessonNumber} | `;

    words.forEach(element => {
        lessonNameFormatted += ` ${element}`;
    });

    lessonNameFormatted += ` |`;

    return lessonNameFormatted;
}

let writeReadMeTable = (lessons) => {
    let logger = fs.createWriteStream('TABLE_OF_CONTENT.md')

    logger.write(`|Number:   |  Topic: |\n|---|---|`);

    lessons.forEach(lesson => {
        logger.write(lesson) // append string to your file
    });
}

print('./').catch(console.error);

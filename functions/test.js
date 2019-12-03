const postElements = [...document.getElementsByClassName('userContentWrapper')].map(e=>e.children[0])

console.log('check postElements', postElements.length)

let posts = []
postElements.forEach(postElement => {

    try {
        const authorName = postElement.querySelector('[data-testid="story-subtitle"]').previousSibling

//         const date = new Date(postElement.querySelector("[data-testid='story-subtitle']").children[2].querySelector("[title]").title)

//         let postMessage = ''
//         const postChildren = postElement.getElementsByClassName('text_exposed_root')[0].children

//         for (let i = 0; i < postChildren.length - 2; i++) {
//             postMessage += postChildren[i].innerText + '\n';
//         }

//         const a = postChildren[postChildren.length - 2].innerText
//         const b = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g

//         const downloadLinks = [...a.matchAll(b)].map(e => e[0])

//         const image = postElement.querySelector("a[rel='theater']").getElementsByTagName('img')[0].src

//         console.log('check a', image)
        posts.push({
            authorName,
//             date,
//             postMessage,
//             downloadLinks,
//             image
        })
    } catch (e) {
        console.log(e)
    }
})

console.log(posts)
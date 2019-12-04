module.exports.getLatestEsl = async (page) => {

    return await page.evaluate(() => {
        const postElements = [...document.getElementsByClassName('userContentWrapper')].map(e => e.children[0])

        console.log('check postElements', postElements.length)

        let posts = []
        postElements.forEach(postElement => {

            try {
                const authorName = postElement.querySelector('[data-testid="story-subtitle"]').previousSibling.getElementsByTagName('a')[0].innerText

                const authorImage = postElement.querySelector(`img[aria-label="${authorName}"]`).src
                const date = new Date(postElement.querySelector("[data-testid='story-subtitle']").querySelector("[title]").title)

                const messageElement = postElement.querySelector("[data-testid='post_message']")

                const showText = messageElement.innerText.replace('See More', '').replace('See Translation', '').replace(/\.\.\.\s\n\n/g, '').replace(/\n/g, '<br>')
                const hideText = [...messageElement.getElementsByClassName('text_exposed_show')].map(e => e.innerText.replace(/\n/g, '<br>')).join('<br>')

                const postMessage = showText + hideText;

                const b = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g

                const downloadLinks = [...postMessage.matchAll(b)].map(e => e[0])

                const nextMessageElement = messageElement.nextElementSibling

                let image = null
                if (nextMessageElement) {
                    imageElement = nextMessageElement.getElementsByTagName('img')[0]
                    if (imageElement) {
                        image = {
                            src: imageElement.src,
                            height: imageElement.height,
                            width: imageElement.width
                        }
                    }
                }

                //         const image = postElement.querySelector("a[rel='theater']").getElementsByTagName('img')[0].src

                //         console.log('check a', image)
                posts.push({
                    author: { name: authorName, image: authorImage },
                    date,
                    postMessage,
                    downloadLinks,
                    image
                })
            } catch (e) {
                console.log(postElement)
                console.log(e)
            }
        })

        const eslPosts = posts.filter(e => e.downloadLinks.length >= 2 && e.downloadLinks.some(link => link.indexOf('www.mediafire.com') >= 0))

        const latestESLPost = eslPosts.sort((a, b) => b.date.getTime() - a.date.getTime())[0]

        return latestESLPost
    })
}
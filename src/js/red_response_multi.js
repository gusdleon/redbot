import { qs, qsa, escapeHtml, docReady } from './red_util.js'
import tippy from 'tippy.js'

docReady(function () {
  qsa('span.prob_num', function (element) {
    const tooltip = qs('span.tip *', element)
    if (tooltip === null) {
      return
    }
    tippy(element, {
      content: tooltip,
      theme: 'redbot',
      delay: [10, 10],
      interactive: true,
      interactiveBorder: 5,
      placement: 'bottom-start',
      offset: [50, 5],
      maxWidth: 460,
      appendTo: document.body
    })
  })

  qsa('.preview', function (element) {
    const link = (element.title !== '') ? escapeHtml(element.title) : escapeHtml(element.href)
    const tooltip = document.createElement('img')
    tooltip.src = link
    tippy(element, {
      content: tooltip,
      theme: 'redbot',
      delay: [10, 10],
      interactive: true,
      interactiveBorder: 5,
      placement: 'bottom-start',
      offset: [50, 5],
      maxWidth: 460,
      appendTo: document.body
    })
  })

  qsa('tr.droid', function (element) {
    const noteNums = []
    qsa('span.prob_num', function (span) {
      if (span.textContent) {
        noteNums.push(span.textContent)
      }
    }, qs('td:last-child', element))
    element.onmouseover = element.onmouseout = function () {
      qsa('li.note', function (noteElement) {
        const noteOffset = noteElement.getAttribute('data-offset')
        if (noteNums.includes(noteOffset)) {
          noteElement.classList.toggle('hilight')
        }
      })
    }
  })
})

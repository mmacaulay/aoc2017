#!/usr/local/bin/racket

#lang racket

(require racket/set)
(require srfi/1)

(define (nodupes? wordlist wordset)
  (match (length wordlist)
         [0 #t]
         [_ (match (set-member? wordset (first wordlist))
               [#t #f]
               [#f (nodupes? (list-tail wordlist 1) (set-add wordset (first wordlist)))])
         ]))

(define (isvalid str)
    (display (string-join (list str ":" (format "~a" (nodupes? (string-split str) (set '())))) " "))
    (newline))

(define (countdupes lines)
  (sequence-count (lambda(line) (nodupes? (string-split line) (set '()))) lines))

(define (testdata)
  (isvalid "aa bb cc dd ee")
  (isvalid "aa bb cc dd aa")
  (isvalid "aa bb cc dd aaa"))

(define (countanagrams lines)
  (sequence-count (lambda(line) (noanagrams? (string-split line))) lines))

(define (combomatch? combo)
  (string=? (first combo) (second combo)))

(define (noanagrams? wordlist)
  (match (findf (lambda(combo)
                  (combomatch? (map (lambda(word)
                                  (list->string
                                    (sort (string->list word) char<?)))
                                    combo)))
           (combinations wordlist 2))
         [#f #t]
         [_ #f])
)

(define (day4)
  (define in (open-input-file "day4.txt"))
  ; (display (countdupes (in-lines in)))
  (display (countanagrams (in-lines in)))
  (close-input-port in))

; (testdata)
(day4)

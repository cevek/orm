export const inspections = {
    author: {
        chapters: [
            {
                "id": 1,
                "name": "John",
                "chapters": [
                    {
                        "id": 1,
                        "docId": 1,
                        "name": "1.1",
                        "authorId": 1
                    },
                    {
                        "id": 2,
                        "docId": 1,
                        "name": "1.2",
                        "authorId": 1
                    },
                    {
                        "id": 3,
                        "docId": 2,
                        "name": "2.1",
                        "authorId": 1
                    }
                ]
            },
            {
                "id": 2,
                "name": "Doe",
                "chapters": [
                    {
                        "id": 4,
                        "docId": 2,
                        "name": "2.2",
                        "authorId": 2
                    }
                ]
            },
            {
                "id": 3,
                "name": "Reviewer1"
            },
            {
                "id": 4,
                "name": "Reviewer2"
            }
        ],
        paragraphs: [
            {
                "id": 1,
                "name": "John",
                "paragraphs": [
                    {
                        "id": 1,
                        "chapterId": 1,
                        "name": "1.1.1"
                    },
                    {
                        "id": 2,
                        "chapterId": 1,
                        "name": "1.1.2"
                    },
                    {
                        "id": 3,
                        "chapterId": 2,
                        "name": "1.2.1"
                    },
                    {
                        "id": 4,
                        "chapterId": 3,
                        "name": "2.1.1"
                    },
                    {
                        "id": 5,
                        "chapterId": 3,
                        "name": "2.1.2"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Doe",
                "paragraphs": [
                    {
                        "id": 6,
                        "chapterId": 4,
                        "name": "2.2.1"
                    }
                ]
            },
            {
                "id": 3,
                "name": "Reviewer1"
            },
            {
                "id": 4,
                "name": "Reviewer2"
            }
        ],
        author: [
            {
                "id": 1,
                "docId": 1,
                "name": "1.1",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 2,
                "docId": 1,
                "name": "1.2",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 3,
                "docId": 2,
                "name": "2.1",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 4,
                "docId": 2,
                "name": "2.2",
                "authorId": 2,
                "author": {
                    "id": 2,
                    "name": "Doe"
                }
            }
        ],
    },
    doc: {
        authors: [
            {
                "id": 1,
                "name": "1",
                "authors": [
                    {
                        "id": 1,
                        "name": "John"
                    },
                    {
                        "id": 1,
                        "name": "John"
                    }
                ]
            },
            {
                "id": 2,
                "name": "2",
                "authors": [
                    {
                        "id": 1,
                        "name": "John"
                    },
                    {
                        "id": 2,
                        "name": "Doe"
                    }
                ]
            }
        ],
        chapters: [
            {
                "id": 1,
                "name": "1",
                "chapters": [
                    {
                        "id": 1,
                        "docId": 1,
                        "name": "1.1",
                        "authorId": 1
                    },
                    {
                        "id": 2,
                        "docId": 1,
                        "name": "1.2",
                        "authorId": 1
                    }
                ]
            },
            {
                "id": 2,
                "name": "2",
                "chapters": [
                    {
                        "id": 3,
                        "docId": 2,
                        "name": "2.1",
                        "authorId": 1
                    },
                    {
                        "id": 4,
                        "docId": 2,
                        "name": "2.2",
                        "authorId": 2
                    }
                ]
            }
        ],
        paragraphs: [
            {
                "id": 1,
                "name": "1",
                "paragraphs": [
                    {
                        "id": 1,
                        "chapterId": 1,
                        "name": "1.1.1"
                    },
                    {
                        "id": 2,
                        "chapterId": 1,
                        "name": "1.1.2"
                    },
                    {
                        "id": 3,
                        "chapterId": 2,
                        "name": "1.2.1"
                    }
                ]
            },
            {
                "id": 2,
                "name": "2",
                "paragraphs": [
                    {
                        "id": 4,
                        "chapterId": 3,
                        "name": "2.1.1"
                    },
                    {
                        "id": 5,
                        "chapterId": 3,
                        "name": "2.1.2"
                    },
                    {
                        "id": 6,
                        "chapterId": 4,
                        "name": "2.2.1"
                    }
                ]
            }
        ],
    },
    chapter: {
        author: [
            {
                "id": 1,
                "docId": 1,
                "name": "1.1",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 2,
                "docId": 1,
                "name": "1.2",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 3,
                "docId": 2,
                "name": "2.1",
                "authorId": 1,
                "author": {
                    "id": 1,
                    "name": "John"
                }
            },
            {
                "id": 4,
                "docId": 2,
                "name": "2.2",
                "authorId": 2,
                "author": {
                    "id": 2,
                    "name": "Doe"
                }
            }
        ],

        doc: [
            {
                "id": 1,
                "docId": 1,
                "name": "1.1",
                "authorId": 1,
                "doc": {
                    "id": 1,
                    "name": "1"
                }
            },
            {
                "id": 2,
                "docId": 1,
                "name": "1.2",
                "authorId": 1,
                "doc": {
                    "id": 1,
                    "name": "1"
                }
            },
            {
                "id": 3,
                "docId": 2,
                "name": "2.1",
                "authorId": 1,
                "doc": {
                    "id": 2,
                    "name": "2"
                }
            },
            {
                "id": 4,
                "docId": 2,
                "name": "2.2",
                "authorId": 2,
                "doc": {
                    "id": 2,
                    "name": "2"
                }
            }
        ],
        paragraphs: [
            {
                "id": 1,
                "docId": 1,
                "name": "1.1",
                "authorId": 1,
                "paragraphs": [
                    {
                        "id": 1,
                        "chapterId": 1,
                        "name": "1.1.1"
                    },
                    {
                        "id": 2,
                        "chapterId": 1,
                        "name": "1.1.2"
                    }
                ]
            },
            {
                "id": 2,
                "docId": 1,
                "name": "1.2",
                "authorId": 1,
                "paragraphs": [
                    {
                        "id": 3,
                        "chapterId": 2,
                        "name": "1.2.1"
                    }
                ]
            },
            {
                "id": 3,
                "docId": 2,
                "name": "2.1",
                "authorId": 1,
                "paragraphs": [
                    {
                        "id": 4,
                        "chapterId": 3,
                        "name": "2.1.1"
                    },
                    {
                        "id": 5,
                        "chapterId": 3,
                        "name": "2.1.2"
                    }
                ]
            },
            {
                "id": 4,
                "docId": 2,
                "name": "2.2",
                "authorId": 2,
                "paragraphs": [
                    {
                        "id": 6,
                        "chapterId": 4,
                        "name": "2.2.1"
                    }
                ]
            }
        ],
        statistic: [
            {
                "id": 1,
                "docId": 1,
                "name": "1.1",
                "authorId": 1,
                "statistic": [
                    {
                        "id": 1,
                        "chapterInfoId": 1,
                        "name": "1.1 Stat"
                    }
                ]
            },
            {
                "id": 2,
                "docId": 1,
                "name": "1.2",
                "authorId": 1
            },
            {
                "id": 3,
                "docId": 2,
                "name": "2.1",
                "authorId": 1,
                "statistic": [
                    {
                        "id": 2,
                        "chapterInfoId": 3,
                        "name": "2.1 Stat"
                    }
                ]
            },
            {
                "id": 4,
                "docId": 2,
                "name": "2.2",
                "authorId": 2
            }
        ],
    },
    chapterInfo: {
        chapter: [
            {
                "id": 1,
                "chapterId": 1,
                "name": "1.1 Info",
                "chapter": {
                    "id": 1,
                    "docId": 1,
                    "name": "1.1",
                    "authorId": 1
                }
            },
            {
                "id": 2,
                "chapterId": 4,
                "name": "2.2 Info",
                "chapter": {
                    "id": 4,
                    "docId": 2,
                    "name": "2.2",
                    "authorId": 2
                }
            },
            {
                "id": 3,
                "chapterId": 3,
                "name": "2.1 Info",
                "chapter": {
                    "id": 3,
                    "docId": 2,
                    "name": "2.1",
                    "authorId": 1
                }
            }
        ],
        statistic: [
            {
                "id": 1,
                "chapterId": 1,
                "name": "1.1 Info",
                "statistic": {
                    "id": 1,
                    "chapterInfoId": 1,
                    "name": "1.1 Stat"
                }
            },
            {
                "id": 2,
                "chapterId": 4,
                "name": "2.2 Info"
            },
            {
                "id": 3,
                "chapterId": 3,
                "name": "2.1 Info",
                "statistic": {
                    "id": 2,
                    "chapterInfoId": 3,
                    "name": "2.1 Stat"
                }
            }
        ],
    },
    chapterStatistic: {
        chapterInfo: [
            {
                "id": 1,
                "chapterInfoId": 1,
                "name": "1.1 Stat",
                "chapterInfo": {
                    "id": 1,
                    "chapterId": 1,
                    "name": "1.1 Info"
                }
            },
            {
                "id": 2,
                "chapterInfoId": 3,
                "name": "2.1 Stat",
                "chapterInfo": {
                    "id": 3,
                    "chapterId": 3,
                    "name": "2.1 Info"
                }
            }
        ],

    },
    paragraph: {
        chapter: [
            {
                "id": 1,
                "chapterId": 1,
                "name": "1.1.1",
                "chapter": {
                    "id": 1,
                    "docId": 1,
                    "name": "1.1",
                    "authorId": 1
                }
            },
            {
                "id": 2,
                "chapterId": 1,
                "name": "1.1.2",
                "chapter": {
                    "id": 1,
                    "docId": 1,
                    "name": "1.1",
                    "authorId": 1
                }
            },
            {
                "id": 3,
                "chapterId": 2,
                "name": "1.2.1",
                "chapter": {
                    "id": 2,
                    "docId": 1,
                    "name": "1.2",
                    "authorId": 1
                }
            },
            {
                "id": 4,
                "chapterId": 3,
                "name": "2.1.1",
                "chapter": {
                    "id": 3,
                    "docId": 2,
                    "name": "2.1",
                    "authorId": 1
                }
            },
            {
                "id": 5,
                "chapterId": 3,
                "name": "2.1.2",
                "chapter": {
                    "id": 3,
                    "docId": 2,
                    "name": "2.1",
                    "authorId": 1
                }
            },
            {
                "id": 6,
                "chapterId": 4,
                "name": "2.2.1",
                "chapter": {
                    "id": 4,
                    "docId": 2,
                    "name": "2.2",
                    "authorId": 2
                }
            }
        ],

    }
}
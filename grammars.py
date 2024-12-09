import re


TEXT_FORMATTING = {
    'b': re.compile(r'\*\*(.*?)\*\*'),
    'i': re.compile(r'\*(.*?)\*'),
    'u': re.compile(r'__(.*?)__'),
    'strikethrough': re.compile(r'~~(.*?)~~'),
    'code': re.compile(r'`(.*?)`'),
    'code_block': re.compile(r'```(.*?)```'),
    'quote': re.compile(r'>(.*)'),
    'link': re.compile(r'\[(.*?)\]\((.*?)\)'),
    'image': re.compile(r'\!\[(.*?)\]\((.*?)\)')
}

HEADING_BLOCK = {
    'heading' : re.compile(r'^(#{1,6})\s(.+)')
}

LISTS = {
    '-item': re.compile(r'^\s*-\s(.+)'),
    '*item': re.compile(r'^\s*\*\s(.+)'),
    '1-item': re.compile(r'^\s*1\.\s(.+)'),
    '-[]Task': re.compile(r'^\s*-\[\]\s(.+)'),
    '-[x]Task': re.compile(r'^\s*-\[x\]\s(.+)')
}

BLOCKS = {
    'blockquote': re.compile(r'^>(.*)'),
    'code_block': re.compile(r'^```(.*)'),
    'horizontal_rule': re.compile(r'^---')
}


def parse_text_formatting(text):
    for key, value in TEXT_FORMATTING.items():
        text = value.sub(rf'<{key}> \g<1></{key}>', text)
    print(text)

parse_text_formatting("**bold** *italic* __underline__ ~~strikethrough~~ `code` ```code_block``` >quote [link](https://www.google.com) ![image](https://www.google.com)")

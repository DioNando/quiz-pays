export interface EmojiInterface {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}

export const exampleEmoji: EmojiInterface = {
  slug: 'e1-0-grinning-face',
  character: '😀',
  unicodeName: 'E1.0 grinning face',
  codePoint: '1F600',
  group: 'smileys-emotion',
  subGroup: 'face-smiling',
};

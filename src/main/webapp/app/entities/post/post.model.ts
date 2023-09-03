export interface IPost {
  id?: number;
  userId?: number | null;
  title?: string | null;
  body?: string | null;
}

export class Post implements IPost {
  constructor(public id?: number, public userId?: number | null, public title?: string | null, public body?: string | null) {}
}

export function getPostIdentifier(post: IPost): number | undefined {
  return post.id;
}

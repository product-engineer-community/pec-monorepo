import { getPost as getPostEntity } from "@/entities/post/action";
import { Post } from "@/entities/post/model";

/**
 * ID로 게시물 상세 정보 조회
 *
 * @param id 게시물 ID
 * @returns 게시물 상세 정보
 */
export async function getPostById(id: string): Promise<Post | null> {
  return getPostEntity(id);
}

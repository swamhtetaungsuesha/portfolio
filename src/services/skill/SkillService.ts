import { db } from "@/db";
import { skills, SkillSelect, SkillWithTag, tags } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { SkillDataWithoutId } from "./Skill";

class SkillService {
  async getList(): Promise<ResponseData<SkillWithTag[]>> {
    try {
      const result = await db
        .select({
          id: skills.id,
          category: skills.category,
          startedAt: skills.startedAt,
          tag: sql<string>`${tags.name}`.as("tag"),
        })
        .from(skills)
        .leftJoin(tags, eq(skills.tagId, tags.id));

      const res: ResponseData<SkillWithTag[]> = {
        success: true,
        message: "Success Get Skills!",
        data: result,
      };

      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: SkillDataWithoutId
  ): Promise<ResponseData<SkillWithTag>> {
    try {
      const response: ResponseData<SkillWithTag> = await ApiService.call(
        "/api/secured/skill/create",
        "POST",
        payload
      );

      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }
  async update(payload: SkillWithTag): Promise<ResponseData<SkillWithTag>> {
    try {
      const response: ResponseData<SkillWithTag> = await ApiService.call(
        "/api/secured/skill/update",
        "POST",
        payload
      );

      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }

  async delete(payload: { id: number }): Promise<ResponseData<SkillSelect>> {
    try {
      const response: ResponseData<SkillSelect> = await ApiService.call(
        "/api/secured/skill/delete",
        "POST",
        payload
      );
      return response;
    } catch (e) {
      const error = e as APIServiceError;

      return {
        success: false,
        message: error.message,
      };
    }
  }
}

export default new SkillService();

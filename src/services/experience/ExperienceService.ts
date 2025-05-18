import {
  companies,
  CompanySelect,
  experiences,
  ExperienceSelect,
  ExperienceWithCompany,
} from "@/db/schema";
import { ResponseData } from "../ApiResponse";
import ApiService from "../ApiService";
import { APIServiceError } from "../ApiServiceError";
import { ExperienceData, ExperienceDataWithoutId } from "./Experience";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";

class ExperienceService {
  async getList(): Promise<ResponseData<ExperienceWithCompany[]>> {
    try {
      const populateCompany = sql<CompanySelect>`JSONB_BUILD_OBJECT(
              'id', ${companies.id},
              'image', ${companies.image},
              'name', ${companies.name},
              'link', ${companies.link}
          )`;
      const result = await db
        .select({
          id: experiences.id,
          company: populateCompany.as("company"),
          position: experiences.position,
          description: experiences.description,
          startedAt: experiences.startedAt,
          endedAt: experiences.endedAt,
          isActive: experiences.isActive,
        })
        .from(experiences)
        .leftJoin(companies, eq(experiences.companyId, companies.id))
        .groupBy(experiences.id, companies.id)
        .orderBy(desc(experiences.startedAt));
      const res: ResponseData<ExperienceWithCompany[]> = {
        success: true,
        message: "Success Get Experiences",
        data: result,
      };
      return res;
    } catch (e) {
      const error = e as APIServiceError;

      return { success: false, message: error.message };
    }
  }

  async create(
    payload: ExperienceDataWithoutId
  ): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/create",
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
  async update(
    payload: ExperienceData
  ): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/update",
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

  async delete(payload: {
    id: number;
  }): Promise<ResponseData<ExperienceSelect>> {
    try {
      const response: ResponseData<ExperienceSelect> = await ApiService.call(
        "/api/secured/experience/delete",
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

export default new ExperienceService();

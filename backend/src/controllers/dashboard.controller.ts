import { HTTP_STATUS } from "@constants/http-status.js";
import dashboardService from "@services/dashboard.service.js";
import type { NextFunction, Request, Response } from "express";

export const getDashboard = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const statistics = await dashboardService.getDashboardStatistics();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: statistics,
    });
  } catch (error) {
    next(error);
  }
};

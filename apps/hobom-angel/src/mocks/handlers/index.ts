import { authHandlers } from "./auth.handlers";
import { userHandlers } from "./user.handlers";
import { animalHandlers } from "./animal.handlers";
import { shelterHandlers } from "./shelter.handlers";
import { reviewHandlers } from "./review.handlers";
import { reportHandlers } from "./report.handlers";
import { volunteerHandlers } from "./volunteer.handlers";
import { volunteerPostHandlers } from "./volunteer-post.handlers";
import { favoriteHandlers } from "./favorite.handlers";
import { mediaHandlers } from "./media.handlers";
import { questionnaireHandlers } from "./questionnaire.handlers";
import { adoptionHandlers } from "./adoption.handlers";
import { fosterHandlers } from "./foster.handlers";
import { applicationHandlers } from "./application.handlers";
import { approvalHandlers } from "./approval.handlers";
import { volunteerCertificateHandlers } from "./volunteer-certificate.handlers";
import { inquiryHandlers } from "./inquiry.handlers";

/** All MSW request handlers, aggregated per domain. Add new domains here. */
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...animalHandlers,
  ...shelterHandlers,
  ...reviewHandlers,
  ...reportHandlers,
  ...volunteerHandlers,
  ...volunteerPostHandlers,
  ...favoriteHandlers,
  ...mediaHandlers,
  ...questionnaireHandlers,
  ...adoptionHandlers,
  ...fosterHandlers,
  ...applicationHandlers,
  ...approvalHandlers,
  ...volunteerCertificateHandlers,
  ...inquiryHandlers,
];

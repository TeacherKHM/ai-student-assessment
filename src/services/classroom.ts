import { google } from "googleapis";

export const getClassroomClient = (accessToken: string) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return google.classroom({ version: "v1", auth });
};

export const getDriveClient = (accessToken: string) => {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });
    return google.drive({ version: "v3", auth });
};

/**
 * Fetches all courses where the user is a teacher.
 */
export async function getTeacherCourses(accessToken: string) {
    const classroom = getClassroomClient(accessToken);
    const response = await classroom.courses.list({
        teacherId: "me",
        courseStates: ["ACTIVE"],
    });
    return response.data.courses || [];
}

/**
 * Fetches all coursework (assignments) for a specific course.
 */
export async function getCourseWork(accessToken: string, courseId: string) {
    const classroom = getClassroomClient(accessToken);
    const response = await classroom.courses.courseWork.list({
        courseId,
    });
    return response.data.courseWork || [];
}

/**
 * Fetches student submissions for a specific coursework.
 */
export async function getStudentSubmissions(accessToken: string, courseId: string, courseWorkId: string) {
    const classroom = getClassroomClient(accessToken);
    const response = await classroom.courses.courseWork.studentSubmissions.list({
        courseId,
        courseWorkId,
    });
    return response.data.studentSubmissions || [];
}

/**
 * Fetches an attachment file from Google Drive.
 */
export async function getDriveFile(accessToken: string, fileId: string) {
    const drive = getDriveClient(accessToken);
    const response = await drive.files.get({
        fileId,
        alt: "media",
    });
    return response.data;
}

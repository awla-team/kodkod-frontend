export default interface AnalysisData {
  classroomData: {
    kpi_total_activities: number;
    kpi_participation_level: number;
    kpi_alerts: number;
    kpi_alerts_level: number;
    kpi_motivation_level: number;
  };
  studentsData: Array<{
    student_id: number;
    first_name: string;
    last_name: string;
    dailyActivities: [];
  }>;
}

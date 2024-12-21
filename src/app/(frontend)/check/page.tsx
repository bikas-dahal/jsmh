'use client'

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Table } from '@/components/ui/table';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const StudentProgressDashboard = () => {
  const sampleData = {
    "Class 6A": {
      students: [
        {
          name: "John Doe",
          subjects: {
            Math: [92, 88, 90, 94],
            Science: [78, 82, 85, 88],
            English: [90, 88, 92, 90],
            History: [88, 85, 87, 89],
            Geography: [92, 88, 90, 91]
          }
        },
        {
          name: "Jane Smith",
          subjects: {
            Math: [85, 90, 88, 92],
            Science: [85, 88, 86, 89],
            English: [88, 90, 87, 89],
            History: [90, 92, 88, 91],
            Geography: [87, 85, 88, 90]
          }
        }
      ]
    }
  };

  const [selectedClass, setSelectedClass] = useState(Object.keys(sampleData)[0]);
  const [selectedStudent, setSelectedStudent] = useState("ALL");
  const [selectedSubject, setSelectedSubject] = useState("Math");
  const [viewMode, setViewMode] = useState("class");

  // Safe data access helper
  const safeGetClassData = () => {
    return sampleData[selectedClass] || { students: [] };
  };

  // Get all subjects safely
  const getAllSubjects = () => {
    const subjects = new Set();
    const classData = safeGetClassData();
    classData.students.forEach(student => {
      if (student?.subjects) {
        Object.keys(student.subjects).forEach(subject => subjects.add(subject));
      }
    });
    return Array.from(subjects);
  };

  // Get chart data safely
  const getChartData = () => {
    const classData = safeGetClassData();
    const students = classData.students || [];
    if (students.length === 0) return [];

    // Find first student with valid data for week count
    const firstStudent = students.find(s => s?.subjects && Object.keys(s.subjects).length > 0);
    if (!firstStudent) return [];

    const firstSubject = Object.keys(firstStudent.subjects)[0];
    const weekCount = firstStudent.subjects[firstSubject]?.length || 0;
    if (weekCount === 0) return [];

    let chartData = [];

    if (viewMode === "student" && selectedStudent !== "ALL") {
      const student = students.find(s => s.name === selectedStudent);
      if (!student?.subjects) return [];

      for (let week = 0; week < weekCount; week++) {
        let weekData = { week: `Week ${week + 1}` };
        
        Object.entries(student.subjects).forEach(([subject, scores]) => {
          if (Array.isArray(scores)) {
            weekData[subject] = scores[week];
            // Calculate average safely
            let sum = 0;
            let count = 0;
            students.forEach(s => {
              if (s?.subjects?.[subject]?.[week] !== undefined) {
                sum += s.subjects[subject][week];
                count++;
              }
            });
            weekData[`${subject} Avg`] = count > 0 ? sum / count : 0;
          }
        });
        chartData.push(weekData);
      }
    } else {
      for (let week = 0; week < weekCount; week++) {
        let weekData = { week: `Week ${week + 1}` };

        if (selectedSubject === "ALL") {
          getAllSubjects().forEach(subject => {
            let sum = 0;
            let count = 0;
            students.forEach(student => {
              if (student?.subjects?.[subject]?.[week] !== undefined) {
                sum += student.subjects[subject][week];
                count++;
              }
            });
            weekData[subject] = count > 0 ? sum / count : 0;
          });
        } else {
          // Class average
          let sum = 0;
          let count = 0;
          students.forEach(student => {
            if (student?.subjects?.[selectedSubject]?.[week] !== undefined) {
              sum += student.subjects[selectedSubject][week];
              count++;
            }
          });
          weekData['Class Average'] = count > 0 ? sum / count : 0;

          // Individual students
          students.forEach(student => {
            if (student?.subjects?.[selectedSubject]?.[week] !== undefined) {
              weekData[student.name] = student.subjects[selectedSubject][week];
            }
          });
        }
        chartData.push(weekData);
      }
    }
    
    return chartData;
  };

  // Get radar data safely
  const getRadarData = (studentName) => {
    const classData = safeGetClassData();
    const student = classData.students.find(s => s.name === studentName);
    if (!student?.subjects) return [];

    return getAllSubjects().map(subject => {
      const scores = student.subjects[subject] || [];
      const latestScore = scores[scores.length - 1] || 0;

      let avgSum = 0;
      let avgCount = 0;
      classData.students.forEach(s => {
        const studentScores = s.subjects?.[subject] || [];
        const score = studentScores[studentScores.length - 1];
        if (score !== undefined) {
          avgSum += score;
          avgCount++;
        }
      });

      return {
        subject,
        score: latestScore,
        average: avgCount > 0 ? avgSum / avgCount : 0
      };
    });
  };

  // Get line style
  const getLineStyle = (dataKey) => {
    if (dataKey.includes('Avg') || dataKey === 'Class Average') {
      return {
        stroke: '#000000',
        strokeWidth: 3,
        strokeDasharray: '5 5'
      };
    }
    return {
      stroke: `hsl(${Math.random() * 360}, 70%, 50%)`,
      strokeWidth: 1.5,
      opacity: 0.7
    };
  };

  const chartData = getChartData();

  return (
    <div className="space-y-4 p-4">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Class</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              className="w-full p-2 border rounded"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              {Object.keys(sampleData).map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>View Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-2 border rounded"
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value)}
            >
              <option value="class">Class Overview</option>
              <option value="student">Student Analysis</option>
              <option value="subject">Subject Analysis</option>
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-2 border rounded"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={viewMode === "subject"}
            >
              <option value="ALL">All Students</option>
              {safeGetClassData().students.map(student => (
                <option key={student.name} value={student.name}>{student.name}</option>
              ))}
            </select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subject</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              className="w-full p-2 border rounded"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={viewMode === "student"}
            >
              <option value="ALL">All Subjects</option>
              {getAllSubjects().map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>
              {viewMode === "student" 
                ? `${selectedStudent}'s Performance Across Subjects`
                : viewMode === "subject"
                  ? `${selectedSubject} Performance Across Class`
                  : "Class Performance Overview"
              }
            </CardTitle>
            <CardDescription>
              {viewMode === "student" 
                ? "Subject averages shown as dashed lines"
                : "Class average shown as dashed line"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                {Object.keys(chartData[0] || {})
                  .filter(key => key !== 'week')
                  .map(dataKey => (
                    <Line
                      key={dataKey}
                      type="monotone"
                      dataKey={dataKey}
                      {...getLineStyle(dataKey)}
                    />
                  ))}
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Radar Chart */}
      {selectedStudent !== "ALL" && viewMode === "student" && (
        <Card>
          <CardHeader>
            <CardTitle>{`${selectedStudent}'s Subject Profile`}</CardTitle>
            <CardDescription>Latest performance across all subjects</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={getRadarData(selectedStudent)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Student Score" dataKey="score" fill="#8884d8" fillOpacity={0.6} />
                <Radar name="Class Average" dataKey="average" fill="#82ca9d" fillOpacity={0.6} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Summary Table */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Name/Subject</th>
                  <th className="p-2 text-center">Latest Score</th>
                  <th className="p-2 text-center">Average</th>
                  <th className="p-2 text-center">Highest</th>
                  <th className="p-2 text-center">Lowest</th>
                  <th className="p-2 text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {viewMode === "student" && selectedStudent !== "ALL"
                  ? getAllSubjects().map(subject => {
                      const student = safeGetClassData().students.find(s => s.name === selectedStudent);
                      const scores = student?.subjects?.[subject] || [];
                      return (
                        <tr key={subject} className="border-b">
                          <td className="p-2">{subject}</td>
                          <td className="p-2 text-center">{scores[scores.length - 1] || 0}</td>
                          <td className="p-2 text-center">
                            {scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0}
                          </td>
                          <td className="p-2 text-center">{scores.length > 0 ? Math.max(...scores) : 0}</td>
                          <td className="p-2 text-center">{scores.length > 0 ? Math.min(...scores) : 0}</td>
                          <td className="p-2 text-center">
                            {scores.length >= 2 
                              ? scores[scores.length - 1] > scores[scores.length - 2]
                                ? <ArrowUp className="text-green-500" />
                                : scores[scores.length - 1] < scores[scores.length - 2]
                                  ? <ArrowDown className="text-red-500" />
                                  : <Minus className="text-gray-500" />
                              : <Minus className="text-gray-500" />
                            }
                          </td>
                        </tr>
                      );
                    })
                  : safeGetClassData().students.map(student => {
                      const scores = student?.subjects?.[selectedSubject] || [];
                      return (
                        <tr key={student.name} className="border-b">
                          <td className="p-2">{student.name}</td>
                          <td className="p-2 text-center">{scores[scores.length - 1] || 0}</td>
                          <td className="p-2 text-center">
                            {scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : 0}
                          </td>
                          <td className="p-2 text-center">{scores.length > 0 ? Math.max(...scores) : 0}</td>
                          <td className="p-2 text-center">{scores.length > 0 ? Math.min(...scores) : 0}</td>
                          <td className="p-2 text-center">
                            {scores.length >= 2
                              ? scores[scores.length - 1] > scores[scores.length - 2]
                                ? <ArrowUp className="text-green-500" />
                               : scores[scores.length - 1] < scores[scores.length - 2]
                                                                 ? <ArrowDown className="text-red-500" />
                                                                 : <Minus className="text-gray-500" />
                                                                : <Minus className="text-gray-500" />
                                                             }
                                                            
                                                           </td>
                                                         </tr>
                                                       );
                                                     })
                                                 }
                                               </tbody>
                                             </table>
                                           </div>
                                         </CardContent>
                                       </Card>
                                     </div>
                                   );
                                 };
                                 
                                 export default StudentProgressDashboard;
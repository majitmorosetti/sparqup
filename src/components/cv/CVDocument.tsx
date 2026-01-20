// components/CVDocument.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { CVData } from '@/types/cv';

const styles = StyleSheet.create({
  // ... tes styles (garde-les identiques)
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2563eb',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: 9,
    color: '#64748b',
  },
  contactItem: {
    marginRight: 15,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.4,
    color: '#334155',
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  position: {
    fontSize: 10,
    color: '#475569',
    fontStyle: 'italic',
    marginBottom: 3,
  },
  period: {
    fontSize: 9,
    color: '#64748b',
  },
  bulletPoints: {
    marginLeft: 10,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  bulletText: {
    fontSize: 9,
    lineHeight: 1.3,
    color: '#334155',
    flex: 1,
    marginLeft: 5,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillChip: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 8,
    color: '#1e40af',
    marginRight: 5,
    marginBottom: 5,
  },
  skillCategory: {
    marginBottom: 6,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#475569',
    marginBottom: 3,
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 2,
  },
  projectDescription: {
    fontSize: 9,
    color: '#334155',
    lineHeight: 1.3,
    marginBottom: 3,
  },
  techStack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  techItem: {
    fontSize: 7,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    color: '#475569',
  },
  twoColumn: {
    flexDirection: 'row',
    gap: 15,
  },
  column: {
    flex: 1,
  },
});

// ✅ Exporte une fonction qui retourne directement <Document>
export const createCVDocument = (data: CVData) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <Text style={styles.title}>{data.personal.title}</Text>
        <View style={styles.contactRow}>
          <Text style={styles.contactItem}>📧 {data.personal.email}</Text>
          <Text style={styles.contactItem}>📱 {data.personal.phone}</Text>
          <Text style={styles.contactItem}>📍 {data.personal.location}</Text>
          {data.personal.linkedin && (
            <Text style={styles.contactItem}>🔗 {data.personal.linkedin}</Text>
          )}
          {data.personal.github && (
            <Text style={styles.contactItem}>💻 {data.personal.github}</Text>
          )}
          {data.personal.website && (
            <Text style={styles.contactItem}>🌐 {data.personal.website}</Text>
          )}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profil</Text>
        <Text style={styles.summary}>{data.summary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Expérience Professionnelle</Text>
        {data.experience.map((exp, index) => (
          <View key={index} style={styles.experienceItem}>
            <View style={styles.experienceHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.position}>{exp.position}</Text>
              </View>
              <Text style={styles.period}>{exp.period}</Text>
            </View>
            <View style={styles.bulletPoints}>
              {exp.description.map((desc, i) => (
                <View key={i} style={styles.bullet}>
                  <Text>•</Text>
                  <Text style={styles.bulletText}>{desc}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Two column: Skills + Education */}
      <View style={styles.twoColumn}>
        {/* Skills */}
        <View style={[styles.section, styles.column]}>
          <Text style={styles.sectionTitle}>Compétences</Text>
          
          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Techniques</Text>
            <View style={styles.skillsContainer}>
              {data.skills.technical.map((skill, i) => (
                <Text key={i} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>Outils</Text>
            <View style={styles.skillsContainer}>
              {data.skills.tools.map((tool, i) => (
                <Text key={i} style={styles.skillChip}>
                  {tool}
                </Text>
              ))}
            </View>
          </View>

          {data.skills.languages.length > 0 && (
            <View style={styles.skillCategory}>
              <Text style={styles.skillCategoryTitle}>Langues</Text>
              <View style={styles.skillsContainer}>
                {data.skills.languages.map((lang, i) => (
                  <Text key={i} style={styles.skillChip}>
                    {lang}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Education */}
        <View style={[styles.section, styles.column]}>
          <Text style={styles.sectionTitle}>Formation</Text>
          {data.education.map((edu, index) => (
            <View key={index} style={{ marginBottom: 8 }}>
              <Text style={styles.company}>{edu.degree}</Text>
              <Text style={styles.position}>{edu.school}</Text>
              <Text style={styles.period}>{edu.period}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projets Notables</Text>
          {data.projects.map((project, index) => (
            <View key={index} style={styles.projectItem}>
              <Text style={styles.projectName}>{project.name}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <View style={styles.techStack}>
                {project.tech.map((tech, i) => (
                  <Text key={i} style={styles.techItem}>
                    {tech}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
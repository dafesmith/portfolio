import { useState } from 'react';
import styles from './ehr-preview.module.css';

export function EhrPreview() {
  const [planOpen, setPlanOpen] = useState(false);

  return (
    <div className={styles.preview} aria-label="Illustrative Fanoni EHR pre-visit workflow using a synthetic QA patient">
      <aside className={styles.sidebar}>
        <div className={styles.brand}><span className={styles.brandIcon}>✿</span><span>Fanoni <b>EHR</b></span></div>
        <small>CLINICAL WORKSPACE</small>
        <div className={styles.areaList} aria-label="Illustrative EHR areas">
          <span>Dashboard</span>
          <span className={styles.selected}>Patients</span>
          <span>Schedule</span>
          <span>Visits</span>
          <span>Care plans</span>
          <span>Revenue cycle</span>
        </div>
        <div className={styles.sideNote}>Chart → plan → visit<br /><b>One connected workflow</b></div>
      </aside>
      <div className={styles.main}>
        <div className={styles.topbar}><span>Patient workspace <b>/ Chart overview</b></span><span className={styles.demoBadge}>DESIGN WALKTHROUGH · SYNTHETIC QA</span></div>
        <div className={styles.body}>
          <div className={styles.patientHeader}>
            <div className={styles.avatar}>DP</div>
            <div className={styles.patientIdentity}><small>PATIENT CHART</small><h2>Dominic Perry</h2><span>Synthetic QA patient · Follow-up review</span></div>
            <div className={styles.patientStatus}><span className={styles.allergy}>No known allergies</span><span className={styles.visit}>Visit preparation</span></div>
          </div>
          <div className={styles.tabs}><span className={styles.activeTab}>Overview</span><span>Problems</span><span>Medications</span><span>Results</span><span>Care plans</span><span>Visits</span></div>
          <div className={styles.intro}><div><span className={styles.kicker}>PRE-VISIT REVIEW</span><h3>The right context before the next decision.</h3></div><p>See the chart, an active care plan, and the next clinical step without rebuilding the patient story.</p></div>
          <div className={styles.workArea}>
            <div className={styles.chartArea}>
              <div className={styles.cardHeader}><span>01 <b>Chart context</b></span><span>From the patient record</span></div>
              <div className={styles.metrics}><div><small>HBA1C</small><strong>5.8%</strong><span>Apr 15</span></div><div><small>eGFR</small><strong>70</strong><span>mL/min · Apr 15</span></div><div><small>ACTIVE MEDICATIONS</small><strong>2</strong><span>On this chart</span></div></div>
              <div className={styles.recordGrid}>
                <div><small>PROBLEMS TO REVIEW</small><strong>Prediabetes</strong><strong>Hyperlipidemia</strong><strong>Anemia</strong></div>
                <div><small>CURRENT MEDICATIONS</small><strong>Atenolol / chlorthalidone</strong><strong>Simvastatin</strong><span>Review chart details before any change.</span></div>
              </div>
            </div>
            <div className={styles.planArea}>
              <div className={styles.cardHeader}><span>02 <b>Care plan</b></span><span className={styles.active}>ACTIVE</span></div>
              <small>GOAL IN THE CHART</small><h4>Maintain blood pressure below 140/90 mmHg</h4><span className={styles.progress}>On track</span>
              <div className={styles.planDivider} />
              {planOpen ? (
                <div className={styles.planDetails}><small>PLAN ACTIVITIES</small><ul><li>Activity and exercise education</li><li>Hypertension diet education</li><li>Smoking cessation education</li></ul></div>
              ) : (
                <><small>NEXT STEP</small><p>Open the plan, review its activities, then continue the visit with the chart in view.</p></>
              )}
              <button type="button" className={styles.planAction} onClick={() => setPlanOpen(open => !open)} aria-expanded={planOpen}>
                {planOpen ? 'Back to overview' : 'Open care plan'} <span>{planOpen ? '↶' : '↗'}</span>
              </button>
            </div>
          </div>
          <div className={styles.workflow}><span>03 / CONTINUE</span><strong>Review chart</strong><b>→</b><strong>Check care plan</strong><b>→</b><strong>Start visit</strong><span className={styles.human}>Clinician stays in control</span></div>
        </div>
      </div>
    </div>
  );
}

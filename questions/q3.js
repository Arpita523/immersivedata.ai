import React from 'react';

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

const STATUS_THEMES = {
    APPROVED: {
        glow: 'rgba(34, 197, 94, 0.4)',
        accent: '#4ade80',
        icon: '✓'
    },
    REJECTED: {
        glow: 'rgba(239, 68, 68, 0.4)',
        accent: '#f87171',
        icon: '✕'
    }
};

const WorkflowResult = ({ decision = "REJECTED", reason = "" }) => {
    const theme = STATUS_THEMES[decision] || STATUS_THEMES.REJECTED;

    const styles = {
        card: {
            padding: '48px',
            borderRadius: '32px',
            maxWidth: '440px',
            margin: '20px auto',
            fontFamily: '-apple-system, sans-serif',
            backgroundColor: '#111',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            textAlign: 'center',
            boxShadow: `0 20px 40px -10px ${theme.glow}`,
            backdropFilter: 'blur(10px)'
        },
        badge: {
            fontSize: '48px',
            marginBottom: '20px',
            color: theme.accent,
            display: 'block'
        },
        title: {
            fontWeight: '900',
            fontSize: '28px',
            margin: '0 0 12px 0',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            color: theme.accent
        },
        description: {
            fontSize: '16px',
            opacity: 0.6,
            lineHeight: '1.5',
            margin: 0
        }
    };

    return React.createElement('div', { style: styles.card },
        React.createElement('span', { style: styles.badge }, theme.icon),
        React.createElement('h2', { style: styles.title }, decision),
        React.createElement('p', { style: styles.description }, reason)
    );
};

if (isNode) {
    import('url').then(({ fileURLToPath }) => {
        const isMain = process.argv[1] && process.argv[1] === fileURLToPath(import.meta.url);
        if (isMain) {
            console.log("-----------------------------------------");
            console.log("✅ Q3: WorkflowResult Premium Component Loaded");
            console.log("-----------------------------------------");
            console.log("Sample Decision : APPROVED");
            console.log("Sample Reason   : All checks passed");
            console.log("\n[TIP] Open dashboard to see Q3 UI: - file:///Users/arpitapandey/Desktop/test/UI_DASHBOARD.html?view=q3");
            console.log("-----------------------------------------");
        }
    });
}

export default WorkflowResult;

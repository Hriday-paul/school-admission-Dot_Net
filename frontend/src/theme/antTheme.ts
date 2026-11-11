const antTheme = {
  token: {
    colorPrimary: "#1B8BCC",
    colorInfo: "#1B8BCC",
  },
  components: {
    Layout: {
      bodyBg: "rgb(255,255,255)",
    },
    Menu: {
      itemSelectedColor: "var(--color-menu-item)",
      // itemHoverColor: "var(--color-menu-item)",
      itemSelectedBg: "var(--color-main)",
    },
    Table: {
      headerBg: "#f3ede6",
      headerColor: "var(--color-main)",
      colorBgContainer: "var(--color-section-bg)",
      headerSplitColor: "var(--color-main)",
      colorText: "var(--color-text-color)",
      borderColor: "var(--color-section-bg)",
      rowHoverBg: "#8249021A",
      footerBg	: "#fff"
    },
    Modal: {
      colorIcon: "rgba(255,255,255,0.45)",
      contentBg: "var(--color-section-bg)",
      colorText: "var(--color-text-color)",
    },

    // Button: {
    //   defaultBg: "var(--color-main)",
    //   defaultColor: "rgba(255,255,255,0.88)",
    // },
     Button: {
      colorPrimary: "var(--color-main)",
      // colorPrimaryHover: "#e25d5d",
    },
    
    Popconfirm: {
      colorWarning: "rgb(205,3,53)",
    },
    Form: {
      labelFontSize: 16,
    },
    // Input: {
    //   colorBorder: "#a2a2a3",
    // },
    
  },
};

export default antTheme;
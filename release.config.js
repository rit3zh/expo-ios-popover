module.exports = {
  branches: ["main"],

  plugins: [
    // Decides version bump (major/minor/patch)
    "@semantic-release/commit-analyzer",

    // Generates release notes
    "@semantic-release/release-notes-generator",

    // Updates CHANGELOG.md
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],

    // Publishes to npm (optional but common)
    "@semantic-release/npm",

    // Creates GitHub Release
    "@semantic-release/github",

    // Commits changelog + package.json version
    [
      "@semantic-release/git",
      {
        assets: ["package.json", "CHANGELOG.md"],
        message:
          "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
      },
    ],
  ],
};

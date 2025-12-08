# Contributing to StockAnalytica

First off, thank you for considering contributing to StockAnalytica! It's people like you that make StockAnalytica such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

### Our Standards

- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## 🤝 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that you don't need to create one. When creating a bug report, please include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node version, etc.)

**Bug Report Template:**
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '....'
3. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 11]
 - Node Version: [e.g. 18.0.0]
 - Browser: [e.g. Chrome 120]
```

### Suggesting Features

Feature requests are welcome! Please provide:

- **Clear title and description**
- **Use case** - Why is this feature needed?
- **Proposed solution**
- **Alternative solutions** considered
- **Additional context**

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Commit using conventional commits
5. Push to your fork
6. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites

- Node.js 16.x or higher
- MongoDB 6.x or higher
- Git

### Setup Steps
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/stockanalytica.git
cd stockanalytica

# Add upstream remote
git remote add upstream https://github.com/JaseWils/stockanalytica.git

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start development servers
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm start
```

## 📝 Coding Standards

### JavaScript/React

- Use ES6+ features
- Use functional components with hooks
- Follow Airbnb JavaScript Style Guide
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### File Structure
```
src/
├── components/       # Reusable components
├── context/         # React Context providers
├── services/        # API services
├── utils/           # Utility functions
├── hooks/           # Custom hooks
└── constants/       # Constants and configs
```

### Code Style
```javascript
// Good ✅
const fetchUserData = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Bad ❌
const fetchData = async (id) => {
  const response = await api.get('/users/' + id);
  return response.data;
};
```

## 💬 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

### Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples
```bash
feat(auth): add password reset functionality

- Add forgot password endpoint
- Implement email sending service
- Create password reset form

Closes #123

---

fix(portfolio): correct P&L calculation

The profit/loss calculation was not accounting for
commission fees properly.

Fixes #456

---

docs(readme): update installation instructions

Add MongoDB Atlas setup guide
```

## 🔄 Pull Request Process

1. **Update Documentation** - Update README.md with details of changes if needed
2. **Update Tests** - Add or update tests for your changes
3. **Follow Code Style** - Ensure code follows project standards
4. **Descriptive PR** - Provide clear description of changes
5. **Link Issues** - Reference related issues in your PR
6. **Request Review** - Tag maintainers for review

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Manual testing completed
- [ ] Screenshots attached (if UI changes)

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated

## Related Issues
Closes #XXX
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md Contributors section
- Release notes
- Project website (coming soon)

## 📫 Questions?

- Create an [issue](https://github.com/JaseWils/stockanalytica/issues)
- Email: bishakmitra@gmail.com
- Discord: [Join our server](https://discord.gg/your-invite)

## 🙏 Thank You!

Your contributions help make StockAnalytica better for everyone!
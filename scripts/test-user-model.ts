import db from '../models/index';
import { UserRole } from '../models/user';

async function testUserModel() {
  try {
    console.log('🔧 Testing User model...');
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    
    // Test User model creation
    const testUser = await db.User.create({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'testpassword123',
      role: UserRole.CORE_TEAM,
      isActive: true,
      phoneNumber: '12345678'
    });
    
    console.log('✅ User created successfully:', {
      id: testUser.id,
      fullName: testUser.getFullName(),
      email: testUser.email,
      role: testUser.role,
      committee: testUser.getCommittee(),
      isLead: testUser.isLead(),
      isAdmin: testUser.isAdmin()
    });
    
    // Test user retrieval
    const retrievedUser = await db.User.findByPk(testUser.id);
    console.log('✅ User retrieved successfully:', retrievedUser?.email);
    
    // Clean up test data
    await testUser.destroy();
    console.log('✅ Test user deleted successfully.');
    
    console.log('🎉 All User model tests passed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await db.sequelize.close();
  }
}

testUserModel();
